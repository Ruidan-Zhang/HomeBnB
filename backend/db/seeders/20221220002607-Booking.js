'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate: '2000-10-04',
        endDate: '2000-10-06'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2001-12-28',
        endDate: '2001-12-30'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2002-01-24',
        endDate: '2002-01-26'
      },
      {
        spotId: 1,
        userId: 2,
        startDate: '2023-05-10',
        endDate: '2023-05-15'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
