// backend/routes/api/reviews.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review, ReviewImage, Spot, SpotImage, User, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateReview = [
    check('review')
      .exists({ checkFalsy: true })
      .withMessage('Review text is required'),
    check('stars')
      .exists({ checkFalsy: true })
      .isInt({ min: 0, max: 5 })
      .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

//Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {

    let currentUserReviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['description', 'createdAt', 'updatedAt']
                }
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });

    const reviewArr = [];

    for (let currentUserReview of currentUserReviews) {
        currentUserReview = currentUserReview.toJSON();

        const previewImages = await SpotImage.findAll({
            where: {
                spotId: currentUserReview.Spot.id,
                preview: true
            }
        })

        if (previewImages.length === 0) {
            currentUserReview.Spot.previewImage = 'No image available.'
        } else if (previewImages.length > 0) {
            currentUserReview.Spot.previewImage = previewImages[0].url;
        }

        reviewArr.push(currentUserReview)
    }

    return res.json({
        "Reviews": reviewArr
    })
});

//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const { reviewId } = req.params;
    const foundReview = await Review.findByPk(reviewId);

    const foundReviewImages = await ReviewImage.findAll({
        where: {
            reviewId: reviewId
        }
    })

    if (!foundReview) {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        next(err)
    } else if (req.user.id !== foundReview.userId) {
        const err = new Error("Forbidden");
        err.status = 403;
        next(err)
    } else if (foundReviewImages.length >= 10) {
        const err = new Error("Maximum number of images for this resource was reached");
        err.status = 403;
        next(err)
    } else {
        const { url } = req.body;
        let newImage = await ReviewImage.create({
            reviewId: reviewId,
            url
        })

        const resultImage = await ReviewImage.findByPk(newImage.id, {
            attributes: ['id', 'url']
        });

        return res.json(resultImage);
    }
});

//Edit a Review
router.put('/:reviewId', validateReview, requireAuth, async (req, res, next) => {
    const { reviewId } = req.params;
    const foundReview = await Review.findByPk(reviewId);

    if (!foundReview) {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        next(err)
    } else if (req.user.id !== foundReview.userId) {
        const err = new Error("Forbidden");
        err.status = 403;
        next(err)
    } else {
        const { review, stars } = req.body;
        foundReview.review = review;
        foundReview.stars = stars;
        await foundReview.save();
        return res.json(foundReview);
    }
});

module.exports = router;
