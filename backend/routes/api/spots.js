// backend/routes/api/spots.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, sequelize } = require('../../db/models');

const router = express.Router();

//Get all Spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll({raw: true});
    const spotsArr = [];

    for (let spot of spots) {
        let avgRating = await Review.findAll({
            where: {
                spotId: spot.id
            },
            attributes: [
                [
                    sequelize.fn('AVG', sequelize.col('stars')),
                    'avgRating'
                ]
            ],
            raw: true
        });
        avgRating = avgRating[0].avgRating;
        spot.avgRating = avgRating;

        let previewImage = await SpotImage.findAll({
            where: {
                spotId: spot.id
            },
            attributes: ['url']
        });
        previewImage = previewImage[0].url;
        spot.previewImage = previewImage;

        spotsArr.push(spot);
    }

    return res.json({
        "Spots": spotsArr
    })
});

//Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    let currentUserSpots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        raw: true
    })
    const spotsArr = [];

    for (let spot of currentUserSpots) {
        let avgRating = await Review.findAll({
            where: {
                spotId: spot.id
            },
            attributes: [
                [
                    sequelize.fn('AVG', sequelize.col('stars')),
                    'avgRating'
                ]
            ],
            raw: true
        });
        avgRating = avgRating[0].avgRating;
        spot.avgRating = avgRating;

        let previewImage = await SpotImage.findAll({
            where: {
                spotId: spot.id
            },
            attributes: ['url']
        });
        previewImage = previewImage[0].url;
        spot.previewImage = previewImage;

        spotsArr.push(spot);
    }

    return res.json({
        "Spots": spotsArr
    })
})

module.exports = router;
