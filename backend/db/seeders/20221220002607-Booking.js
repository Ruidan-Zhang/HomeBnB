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
        spotId: 2,
        userId: 1,
        startDate: '2021-10-04',
        endDate: '2021-10-06'
      },
      {
        spotId: 3,
        userId: 1,
        startDate: '2021-12-28',
        endDate: '2021-12-30'
      },
      {
        spotId: 4,
        userId: 1,
        startDate: '2023-07-30',
        endDate: '2023-08-05'
      },
      {
        spotId: 5,
        userId: 1,
        startDate: '2023-05-10',
        endDate: '2023-05-15'
      },
      {
        spotId: 6,
        userId: 1,
        startDate: '2023-09-16',
        endDate: '2023-10-13'
      },
      {
        spotId: 7,
        userId: 1,
        startDate: '2023-08-11',
        endDate: '2023-09-06'
      },
      {
        spotId: 8,
        userId: 1,
        startDate: '2023-12-09',
        endDate: '2023-12-18'
      },
      {
        spotId: 9,
        userId: 1,
        startDate: '2023-06-23',
        endDate: '2023-07-28'
      },
      {
        spotId: 10,
        userId: 1,
        startDate: '2024-01-03',
        endDate: '2024-02-19'
      },
      {
        spotId: 11,
        userId: 1,
        startDate: '2024-03-08',
        endDate: '2024-03-30'
      },
      {
        spotId: 12,
        userId: 1,
        startDate: '2024-04-17',
        endDate: '2024-05-07'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  }
};
