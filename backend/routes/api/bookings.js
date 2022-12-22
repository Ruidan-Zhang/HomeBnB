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
    const currentDate = new Date().getTime();
    const endDateObj = new Date(endDate).getTime();

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
    } else if (endDateObj <= currentDate) {
        const err = new Error("Past bookings can't be modified");
        err.status = 403;
        next(err)
    }

    const allBookings = await Booking.findAll({
        where: {
            spotId: foundBooking.spotId
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

    foundBooking.startDate = startDate;
    foundBooking.endDate = endDate;
    await foundBooking.save();
    return res.json(foundBooking);
});

module.exports = router;
