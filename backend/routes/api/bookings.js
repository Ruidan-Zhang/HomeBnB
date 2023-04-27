// backend/routes/api/bookings.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking, Review, ReviewImage, Spot, SpotImage, User, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateBooking = [
    check('startDate')
      .exists({ checkFalsy: true })
      .withMessage('StartDate is required'),
    check('endDate')
      .exists({ checkFalsy: true })
      .withMessage('StartDate is required'),
    handleValidationErrors
  ];


//Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    const currentUserBookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }
        ]
    });

    const bookingArr = [];

    for (let currentUserBooking of currentUserBookings) {
        currentUserBooking = currentUserBooking.toJSON();

        const previewImages = await SpotImage.findAll({
            where: {
                spotId: currentUserBooking.spotId,
                preview: true
            }
        });

        if (previewImages.length === 0) {
            currentUserBooking.Spot.previewImage = 'No image available.'
        } else if (previewImages.length > 0) {
            currentUserBooking.Spot.previewImage = previewImages[0].url;
        }

        bookingArr.push(currentUserBooking);
    }

    return res.json({
        "Bookings": bookingArr
    })
});

//Edit a Booking
router.put('/:bookingId', validateBooking, requireAuth, async (req, res, next) => {
    const bookingId = req.params.bookingId;
    const foundBooking = await Booking.findByPk(bookingId);
    const { startDate, endDate } = req.body;

    if (!foundBooking) {
        const err = new Error("Booking couldn't be found");
        err.status = 404;
        next(err)
    } else if (req.user.id !== foundBooking.userId) {
        const err = new Error("Forbidden");
        err.status = 403;
        next(err)
    } else if (endDate <= startDate){
        res.status = 400;
        res.statusCode = 400;
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "endDate": "endDate cannot come before startDate"
            }
        })
    }

    const oldStartDate = foundBooking.startDate;
    const currentDate = new Date().getTime();
    const startDateObj = new Date(oldStartDate).getTime();

    if (startDateObj <= currentDate) {
        res.status = 403;
        res.statusCode = 403;
        return res.json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
        })
    }

    const allBookings = await Booking.findAll({
        where: {
            spotId: foundBooking.spotId
        }
    });

    for (let eachBooking of allBookings) {
        eachBooking = eachBooking.toJSON();

        if ((startDate >= eachBooking.startDate && endDate <= eachBooking.endDate) ||
        (startDate < eachBooking.startDate && endDate > eachBooking.endDate)) {
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
        } else if (startDate <= eachBooking.endDate && endDate > eachBooking.endDate) {
            res.status = 403;
            res.statusCode = 403;
            return res.json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "statusCode": 403,
                "errors": {
                  "startDate": "Start date conflicts with an existing booking"
                }
            })
        } else if (startDate < eachBooking.startDate && endDate >= eachBooking.startDate) {
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

    foundBooking.startDate = startDate;
    foundBooking.endDate = endDate;
    await foundBooking.save();
    return res.json(foundBooking);
});

//Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const { bookingId } = req.params;
    const foundBooking = await Booking.findByPk(bookingId);
    const currentDate = new Date().getTime();

    if (!foundBooking) {
        const err = new Error("Booking couldn't be found");
        err.status = 404;
        next(err)
    };

    const startDate = foundBooking.startDate;
    const startDateObj = new Date(startDate).getTime();

    const foundSpot = await Spot.findByPk(foundBooking.spotId)

    if (startDateObj <= currentDate) {
        res.status = 403;
        res.statusCode = 403;
        return res.json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 403
        })
    }
    if (req.user.id !== foundBooking.userId &&
        (req.user.id !== foundSpot.ownerId) ) {
            const err = new Error("Forbidden");
            err.status = 403;
            next(err)
    } else {
        await foundBooking.destroy();
        res.statusCode = 200;
        return res.json(foundBooking);
    }
});

module.exports = router;
