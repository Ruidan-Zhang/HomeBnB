'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "first spot address",
        city: "city1",
        state: "state1",
        country: "country1",
        lat: 11.1,
        lng: 22.2,
        name: "first spot name",
        description: "first spot description",
        price: 10
      },
      {
        ownerId: 2,
        address: "second spot address",
        city: "city2",
        state: "state2",
        country: "country2",
        lat: 33.3,
        lng: 44.4,
        name: "second spot name",
        description: "second spot description",
        price: 20
      },
      {
        ownerId: 3,
        address: "third spot address",
        city: "city3",
        state: "state3",
        country: "country3",
        lat: 55.5,
        lng: 66.6,
        name: "third spot name",
        description: "third spot description",
        price: 30
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
