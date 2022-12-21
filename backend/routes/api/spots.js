// backend/routes/api/spots.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, sequelize } = require('../../db/models');

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
});

//Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
    const spotId = req.params.spotId;
    let spot = await Spot.findByPk(spotId, {
        include: [
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            }
        ]
    });

    if (!spot) {
        res.status = 404;
        res.statusCode = 404;
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": res.status
        })
    } else {
        spot = spot.toJSON();

        let numReviews = await Review.count({
            where: {
                spotId: spotId
            }
        })
        spot.numReviews = numReviews;

        let avgRating = await Review.findAll({
            where: {
                spotId: spotId
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
        spot.avgStarRating = avgRating;

        let owner = await User.findAll({
            where: {
                id: spot.ownerId
            },
            attributes: ['id', 'firstName', 'lastName']
        })
        spot.Owner = owner[0];

        return res.json(spot)
    }
});

module.exports = router;
