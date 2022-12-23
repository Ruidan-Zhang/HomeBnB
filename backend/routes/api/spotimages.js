// backend/routes/api/spotimages.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, Booking, SpotImage, User, sequelize } = require('../../db/models');


const router = express.Router();

//Delete a Spot Image
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { imageId } = req.params;
    const foundImage = await SpotImage.findByPk(imageId);

    if (!foundImage) {
        res.status = 404;
        res.statusCode = 404;
        return res.json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
        })
    }

    const foundSpot = await Spot.findByPk(foundImage.spotId);
    
    if (req.user.id !== foundSpot.ownerId) {
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
