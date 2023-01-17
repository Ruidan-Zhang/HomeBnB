'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 3,
        review: "This was our second time at this place and it was just as enjoyable as the first! The views are incredible and the house is well equipped to handle larger groups. I would definitely recommend this place to anyone looking for a fun stay on the lake.",
        stars: 5
      },
      {
        spotId: 2,
        userId: 3,
        review: "Amazing views , super cozy!",
        stars: 4
      },
      {
        spotId: 3,
        userId: 1,
        review: "Everything about our stay was great. The location was perfect for local ski and snow tubing with our family. The space was great for family meals and time playing games. The view really is amazing and every night we watched a family of dear at the lakes edge. We look forward to staying here again.",
        stars: 4
      },
      {
        spotId: 4,
        userId: 1,
        review: "Quiet and clean, but the rooms were smaller than they looked on the website.",
        stars: 2
      },
      {
        spotId: 5,
        userId: 1,
        review: "Location is terrible.",
        stars: 2
      },
      {
        spotId: 6,
        userId: 3,
        review: "Beautiful spot! Hosts were very helpful and responsive. Highly recommend.",
        stars: 4
      },
      {
        spotId: 7,
        userId: 5,
        review: "We loved the experience of relaxing at this place, having a cup of tea looking out at the trees, and watching movie marathons on the projector. It’s the perfect set up for a relaxing get away.",
        stars: 5
      },
      {
        spotId: 8,
        userId: 6,
        review: "A magical and quaint escape from the daily grind. Highly recommend!",
        stars: 4
      },
      {
        spotId: 5,
        userId: 7,
        review: "Sinks are dirty.",
        stars: 3
      },
      {
        spotId: 5,
        userId: 3,
        review: "Worst experience ever!!",
        stars: 1
      },
      {
        spotId: 1,
        userId: 5,
        review: "Had an excellent time here. Definitely feels more like camping than a hotel stay, which my partner and I love. The bed was super comfy and it was great spending almost the whole day in the sun on the patio.",
        stars: 5
      },
      {
        spotId: 2,
        userId: 1,
        review: "Cozy and relaxing, but could be more quiet.",
        stars: 3
      },
      {
        spotId: 3,
        userId: 2,
        review: "This place is AMAZING!! I highly recommend this place. The surroundings are magical!",
        stars: 5
      },
      {
        spotId: 4,
        userId: 6,
        review: "Great weekend getaway. Place is exactly as described. The back porch is relaxing. If it is raining you will get slightly wet but there is a good amount of tree cover. Recommend turning the heat off at night as the loft can get warmer. Quick connections to some great hikes, waterfalls and good food in Snoqualmie and North bend.",
        stars: 4
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]: ['first review', 'second review', 'third review'] }
    }, {});
  }
};
