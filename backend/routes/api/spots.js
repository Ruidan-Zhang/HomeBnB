// backend/routes/api/spots.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, sequelize } = require('../../db/models');

const router = express.Router();

//Get all Spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        include: [
            {
                model: SpotImage,
                attributes: ['url', 'preview']
            },
            {
                model: Review,
                attributes: {
                    include: [
                        sequelize.fn('AVG', sequelize.col('stars')),
                        'avgRating'
                    ]
                }
            }
        ]
    });
    const spotsArr = [];
    spots.forEach(spot => {
        spotsArr.push(spot);
    });
    return res.json({
        "Spots": spotsArr
    });
})

//Get all Spots owned by the Current User

module.exports = router;
