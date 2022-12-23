// backend/routes/api/spots.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, Booking, SpotImage, User, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

const router = express.Router();

const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage('City is required'),
    check('state')
      .exists({ checkFalsy: true })
      .withMessage('State is required'),
    check('country')
      .exists({ checkFalsy: true })
      .withMessage('Country is required'),
    check('lat')
      .exists({ checkFalsy: true })
      .isDecimal()
      .withMessage('Latitude is not valid'),
      check('lng')
      .exists({ checkFalsy: true })
      .isDecimal()
      .withMessage('Longitude is not valid'),
    check('name')
      .exists({ checkFalsy: true })
      .isLength({ max: 49 })
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('Description is required'),
    check('price')
      .exists({ checkFalsy: true })
      .isNumeric({ min: 0 })
      .withMessage('Price per day is required'),
    handleValidationErrors
  ];

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

  const validateBooking = [
    check('startDate')
      .exists({ checkFalsy: true })
      .withMessage('StartDate is required'),
    check('endDate')
      .exists({ checkFalsy: true })
      .withMessage('StartDate is required'),
    handleValidationErrors
  ];

  const validateQuery = [
    check('page')
      .optional()
      .isNumeric()
      .withMessage('Page must be a number'),
    check('size')
      .optional()
      .isNumeric()
      .withMessage('Size must be a number'),
    check('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be greater than or equal to 1'),
    check('size')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Size must be greater than or equal to 1'),
    check('maxLat')
      .optional()
      .isDecimal()
      .withMessage('Maximum latitude is invalid'),
    check('minLat')
      .optional()
      .isDecimal()
      .withMessage('Minimum latitude is invalid'),
    check('minLng')
      .optional()
      .isDecimal()
      .withMessage('Minimum longitude is invalid'),
      check('maxLng')
      .optional()
      .isDecimal()
      .withMessage('Maximum longitude is invalid'),
      check('minPrice')
      .optional()
      .isNumeric()
      .withMessage('Minimum price must be a number'),
    check('maxPrice')
      .optional()
      .isNumeric()
      .withMessage('Maximum price must be a number'),
    check('minPrice')
      .optional()
      .isNumeric({ min: 0 })
      .withMessage('Minimum price must be greater than or equal to 0'),
    check('maxPrice')
      .optional()
      .isNumeric({ min: 0 })
      .withMessage('Maximum price must be greater than or equal to 0'),
    handleValidationErrors
  ];

//Get all Spots
router.get('/', validateQuery, async (req, res) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    const pagination = {};

    page = +page;
    size = +size;
    if (!page) page = 1;
    if(page > 10) page = 10;
    if (!size || size > 20) size = 20;

    if (page >=1 && size >=1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    }

    let query = {
        where: {},
        ...pagination
    }

    //lat query
    if (minLat && !maxLat) {
        query.where.lat = { [Op.gte]: req.query.minLat }
    } else if (!minLat && maxLat) {
        query.where.lat = { [Op.lte]: req.query.maxLat }
    } else if (minLat && maxLat) {
        query.where.lat = {
            [Op.and]: { [Op.gte]: req.query.minLat, [Op.lte]: req.query.maxLat}
        }
    }

    //lng query
    if (minLng && !maxLng) {
        query.where.lng = { [Op.gte]: req.query.minLng }
    } else if (!minLng && maxLng) {
        query.where.lng = { [Op.lte]: req.query.maxLng }
    } else if (minLng && maxLng) {
        query.where.lng = {
            [Op.and]: { [Op.gte]: req.query.minLng, [Op.lte]: req.query.maxLng}
        }
    }

    //price query
    if (minPrice && !maxPrice) {
        query.where.price = { [Op.gte]: req.query.minPrice }
    } else if (!minPrice && maxPrice) {
        query.where.price = { [Op.lte]: req.query.maxPrice }
    } else if (minPrice && maxPrice) {
        query.where.price = {
            [Op.and]: { [Op.gte]: req.query.minPrice, [Op.lte]: req.query.maxPrice}
        }
    }

    const spots = await Spot.findAll(query);
    const spotsArr = [];

    for (let spot of spots) {
        spot = spot.toJSON();
        let avgRatingArr = await Review.findAll({
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

        const avgRatingObj = avgRatingArr[0];

        if(!avgRatingObj.avgRating) {
            spot.avgRating = 'No ratings yet.'
        } else {
            spot.avgRating = avgRatingObj.avgRating;
        }

        let previewImages = await SpotImage.findAll({
            where: {
                spotId: spot.id,
                preview: true
            },
            attributes: ['url']
        });

        if (previewImages.length === 0) {
            spot.previewImage = 'No image available.'
        } else if (previewImages.length > 0) {
            spot.previewImage = previewImages[0].url;
        }

        spotsArr.push(spot);
    }

    return res.json({
        "Spots": spotsArr,
        page: page,
        size: size
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
        let avgRatingArr = await Review.findAll({
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

        const avgRatingObj = avgRatingArr[0];

        if(!avgRatingObj.avgRating) {
            spot.avgRating = 'No ratings yet.'
        } else {
            spot.avgRating = avgRatingObj.avgRating;
        }

        let previewImages = await SpotImage.findAll({
            where: {
                spotId: spot.id,
                preview: true
            },
            attributes: ['url']
        });

        if (previewImages.length === 0) {
            spot.previewImage = 'No image available.'
        } else if (previewImages.length > 0) {
            spot.previewImage = previewImages[0].url;
        }

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
                attributes: ['id', 'url', 'preview'],
                where: {
                    preview: true
                }
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

        let avgRatingArr = await Review.findAll({
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

        const avgRatingObj = avgRatingArr[0];

        if(!avgRatingObj.avgRating) {
            spot.avgStarRating = 'No ratings yet.'
        } else {
            spot.avgStarRating = avgRatingObj.avgRating;
        }

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

//Create a Spot
router.post('/', validateSpot, requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });

    res.statusCode = 201;
    return res.json(newSpot);
});

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const foundSpot = await Spot.findByPk(spotId);

    if (!foundSpot) {
        res.status = 404;
        res.statusCode = 404;
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": res.status
        })
    } else if (req.user.id !== foundSpot.ownerId) {
        res.status = 403;
        res.statusCode = 403;
        return res.json({
            "message": "Forbidden",
            "statusCode": res.status
        })
    } else {
        const { url, preview } = req.body;
        let newImage = await SpotImage.create({
            spotId: spotId,
            url,
            preview
        })

        const resultImage = await SpotImage.findByPk(newImage.id, {
            attributes: ['id', 'url', 'preview']
        });

        return res.json(resultImage);
    }
});

//Edit a Spot
router.put('/:spotId', validateSpot, requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const foundSpot = await Spot.findByPk(spotId);

    if (!foundSpot) {
        res.status = 404;
        res.statusCode = 404;
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": res.status
        })
    } else if (req.user.id !== foundSpot.ownerId) {
        res.status = 403;
        res.statusCode = 403;
        return res.json({
            "message": "Forbidden",
            "statusCode": res.status
        })
    } else {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        foundSpot.update({
            ownerId: req.user.id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        });
        return res.json(foundSpot);
    }
});

//Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const foundSpot = await Spot.findByPk(spotId);

    if (!foundSpot) {
        res.statusCode = 404;
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    } else if (req.user.id !== foundSpot.ownerId) {
        res.status = 403;
        res.statusCode = 403;
        return res.json({
            "message": "Forbidden",
            "statusCode": res.status
        })
    } else {
        await foundSpot.destroy();
        res.statusCode = 200;
        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }
});

//Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res, next) => {
    const { spotId } = req.params;
    const foundSpot = await Review.findByPk(spotId);

    if (!foundSpot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        next(err)
    } else {
        const reviewArr = [];
        const foundSpotReviews = await Review.findAll({
            where: {
                spotId: foundSpot.id
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                }
            ]
        });

        for (let foundSpotReview of foundSpotReviews) {
            foundSpotReview = foundSpotReview.toJSON();


        let previewImages = await SpotImage.findAll({
            where: {
                spotId: foundSpotReview.spotId,
                preview: true
            },
            attributes: ['id', 'url']
        });

        if (previewImages.length === 0) {
            foundSpotReview.previewImages = 'No image available.'
        } else if (previewImages.length > 0) {
            foundSpotReview.previewImages = previewImages;
        }

            reviewArr.push(foundSpotReview);

        }

        return res.json({
            "Reviews": reviewArr
        })
    }
});

//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', validateReview, requireAuth, async (req, res, next) => {
    const { spotId } = req.params;
    const foundSpot = await Spot.findByPk(spotId);

    const foundReview = await Review.findOne({
        where: {
            userId: req.user.id,
            spotId: spotId
        }
    })

    if (!foundSpot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        next(err)
    } else if (foundReview) {
        const err = new Error("User already has a review for this spot");
        err.status = 403;
        next(err)
    } else {
        const { review, stars } = req.body;
        const newReview = await Review.create({
            userId: req.user.id,
            spotId: foundSpot.id,
            review,
            stars
        });

        res.statusCode = 201;
        return res.json(newReview);
    }
});

//Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { spotId } = req.params;
    const foundSpot = await Spot.findByPk(spotId);

    if (!foundSpot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        next(err)
    } else if (req.user.id !== foundSpot.ownerId) {
        const foundBookings = await Booking.findAll({
            where: {
                spotId: spotId
            },
            attributes: ['spotId', 'startDate', 'endDate']
        });

        const bookingArr = [];

        for (let foundBooking of foundBookings) {
            bookingArr.push(foundBooking);
        }

        return res.json({
            "Bookings": bookingArr
        })
    } else if (req.user.id === foundSpot.ownerId) {
        const foundBookings = await Booking.findAll({
            where: {
                spotId: spotId
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                }
            ]
        });

        const bookingArr = [];

        for (let foundBooking of foundBookings) {
            bookingArr.push(foundBooking)
        }
        return res.json({
            "Bookings": bookingArr
        })
    }
});

//Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', validateBooking, requireAuth, async (req, res, next) => {
    const { spotId } = req.params;
    const foundSpot = await Spot.findByPk(spotId);
    const { startDate, endDate } = req.body;

    if (!foundSpot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        next(err)
    } else if (endDate <= startDate) {
        const err = new Error("endDate cannot be on or before startDate");
        err.status = 400;
        next(err)
    } else if (req.user.id === foundSpot.ownerId) {
        const err = new Error("Forbidden");
        err.status = 403;
        next(err)
    }

    const allBookings = await Booking.findAll({
        where: {
            spotId: foundSpot.id
        }
    });

    for (let eachBooking of allBookings) {
        eachBooking = eachBooking.toJSON();

        if (startDate >= eachBooking.startDate && endDate <= eachBooking.endDate) {
            res.status = 403;
            res.statusCode = 403;
            return res.json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "statusCode": 403,
                "errors": {
                  "startDate": "Start date conflicts with an existing booking",
                  "endDate": "End date conflicts with an existing booking"
                }
            })
        } else if (startDate >= eachBooking.startDate) {
            console.log(startDate);
            console.log(eachBooking.startDate)
            res.status = 403;
            res.statusCode = 403;
            return res.json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "statusCode": 403,
                "errors": {
                  "startDate": "Start date conflicts with an existing booking"
                }
            })
        } else if (endDate <= eachBooking.endDate) {
            res.status = 403;
            res.statusCode = 403;
            return res.json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "statusCode": 403,
                "errors": {
                  "endDate": "End date conflicts with an existing booking"
                }
            })
        }
    }

    const newBooking = await Booking.create({
        spotId: spotId,
        userId: req.user.id,
        startDate,
        endDate
    })

    res.statusCode = 201;
    return res.json(newBooking);

})

module.exports = router;
