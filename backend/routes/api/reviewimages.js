// backend/routes/api/reviewimages.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, ReviewImage, SpotImage, User, sequelize } = require('../../db/models');


const router = express.Router();

//Delete a Review Image
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { imageId } = req.params;
    const foundImage = await ReviewImage.findByPk(imageId);

    if (!foundImage) {
        res.status = 404;
        res.statusCode = 404;
        return res.json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
        })
    }

    const foundReview = await Review.findByPk(foundImage.reviewId);

    if (req.user.id !== foundReview.userId) {
        const err = new Error("Forbidden");
        err.status = 403;
        next(err)
    } else {
        await foundImage.destroy();
        res.statusCode = 200;
        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }
});

module.exports = router;
