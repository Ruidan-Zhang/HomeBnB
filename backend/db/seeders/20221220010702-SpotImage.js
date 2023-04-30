'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-52675973/original/45efa289-0c73-4655-921f-0101e5b67b91.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/dc95c204-8be3-4b8d-8a88-251d1f6381af.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-828636047925065660/original/85447f32-7230-424a-b076-4592bf0c2eb3.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-45987517/original/e50a3c60-b4d7-4070-8aaa-a8c873ebd1c8.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-44306436/original/9a5aa02d-b57a-453b-828d-253e9479dfa3.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/cb1f948e-5c43-4390-8b86-06e7a2f6a28a.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-613825092990187953/original/e0631e7f-713a-4c9d-bd92-9e30f6fc43eb.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-613825092990187953/original/2edbd551-71dd-48dc-8d4a-8b75f01a0764.jpeg?im_w=1440',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/82c577ee-3422-4fda-ae09-6716d76e8bef.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-44666241/original/0591ad1e-13fb-4a92-9cbc-142ef84da392.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53503031/original/c1ba9b61-6b71-430d-add1-69d1ab8b2b6e.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/a19cd4a2-c7da-40f1-840c-11052830966e.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 13,
        url: 'https://a0.muscache.com/im/pictures/af8160e6-40c9-4123-b39d-95cd9121cdcd.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 14,
        url: 'https://a0.muscache.com/im/pictures/4227f62a-60f6-45b1-a3a4-6174f2c30f30.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 15,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-43946664/original/1c6cc1ea-4622-4024-90be-17abe4ed028d.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 16,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-619796613778817286/original/3dbba644-d076-4a6d-9dda-81e54d7c1777.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 17,
        url: 'https://a0.muscache.com/im/pictures/74454988-2c3c-4975-9b4c-740a4a830939.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 18,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-46472449/original/719ea274-0139-4699-a4c4-e5bd1063c86a.jpeg?im_w=1200',
        preview: true
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  }
};
