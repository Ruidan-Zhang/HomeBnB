// backend/routes/api/reviews.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review, Spot, SpotImage, User, sequelize } = require('../../db/models');


const router = express.Router();


//Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {
    const currentUserReviews = await Review.findAll()
    console.log(currentUserReviews)
    return res.json(currentUserReviews)
});


module.exports = router;
