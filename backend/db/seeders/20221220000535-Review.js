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
        spotId: 1,
        userId: 2,
        review: "Amazing views , super cozy!",
        stars: 4
      },
      {
        spotId: 2,
        userId: 3,
        review: "Everything about our stay was great. The location was perfect for local ski and snow tubing with our family. The space was great for family meals and time playing games. The view really is amazing and every night we watched a family of dear at the lakes edge. We look forward to staying here again.",
        stars: 4
      },
      {
        spotId: 2,
        userId: 3,
        review: "Quiet and clean, but the rooms were smaller than they looked on the website.",
        stars: 2
      },
      {
        spotId: 3,
        userId: 1,
        review: "Location is terrible.",
        stars: 1
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
