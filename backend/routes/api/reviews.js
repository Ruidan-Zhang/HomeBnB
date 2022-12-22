// backend/routes/api/reviews.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review, ReviewImage, Spot, SpotImage, User, sequelize } = require('../../db/models');


const router = express.Router();


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

module.exports = router;
