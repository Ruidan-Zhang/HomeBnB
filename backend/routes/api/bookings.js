// backend/routes/api/bookings.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking, Review, ReviewImage, Spot, SpotImage, User, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


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

module.exports = router;
