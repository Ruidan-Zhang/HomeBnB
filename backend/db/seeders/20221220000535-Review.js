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
        userId: 1,
        review: "first review",
        stars: 1
      },
      {
        spotId: 2,
        userId: 2,
        review: "second review",
        stars: 2
      },
      {
        spotId: 3,
        userId: 3,
        review: "third review",
        stars: 3
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
