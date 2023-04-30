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
        userId: 2,
        review: "My sisters and I love this place so much, and would love to come back! I chose it because of the beautiful pictures of it annd and it's even more beautiful in person! It's a stunning place and very clean and has everything you need!",
        stars: 5
      },
      {
        spotId: 1,
        userId: 3,
        review: "Beautiful place. A little dated but very clean and tidy. We loved the location. Very private. The host was very responsive and provided excellent communication.",
        stars: 4
      },
      {
        spotId: 1,
        userId: 4,
        review: "Was a beautiful place. Very secluded with great views. Will definitely stay there again.",
        stars: 4
      },
      {
        spotId: 1,
        userId: 5,
        review: "What a superb visit! House was beautiful. Views were INCREDIBLE (as advertised), the communication was so warm welcoming and regular even leading up to our stay.",
        stars: 5
      },
      {
        spotId: 1,
        userId: 6,
        review: "Loved this little gem of a house. Peaceful and beautiful scenery. Wish we had a few more days to enjoy it. Definitely want to come back.",
        stars: 5
      },
      {
        spotId: 2,
        userId: 1,
        review: "This was our second time at this place and it was just as enjoyable as the first! The views are incredible and the house is well equipped to handle larger groups. I would definitely recommend this place to anyone looking for a fun stay on the lake.",
        stars: 5
      },
      {
        spotId: 3,
        userId: 1,
        review: "Amazing views , super cozy!",
        stars: 4
      },
      {
        spotId: 4,
        userId: 1,
        review: "Everything about our stay was great. The location was perfect for local ski and snow tubing with our family. The space was great for family meals and time playing games. The view really is amazing and every night we watched a family of dear at the lakes edge. We look forward to staying here again.",
        stars: 4
      },
      {
        spotId: 5,
        userId: 1,
        review: "Quiet and clean, but the rooms were smaller than they looked on the website.",
        stars: 2
      },
      {
        spotId: 6,
        userId: 1,
        review: "Location is terrible.",
        stars: 2
      },
      {
        spotId: 7,
        userId: 1,
        review: "Beautiful spot! Hosts were very helpful and responsive. Highly recommend.",
        stars: 4
      },
      {
        spotId: 8,
        userId: 1,
        review: "We loved the experience of relaxing at this place, having a cup of tea looking out at the trees, and watching movie marathons on the projector. It’s the perfect set up for a relaxing get away.",
        stars: 5
      },
      {
        spotId: 9,
        userId: 2,
        review: "A magical and quaint escape from the daily grind. Highly recommend!",
        stars: 4
      },
      {
        spotId: 10,
        userId: 2,
        review: "Sinks are dirty.",
        stars: 3
      },
      {
        spotId: 11,
        userId: 3,
        review: "Worst experience ever!!",
        stars: 1
      },
      {
        spotId: 12,
        userId: 4,
        review: "Had an excellent time here. Definitely feels more like camping than a hotel stay, which my partner and I love. The bed was super comfy and it was great spending almost the whole day in the sun on the patio.",
        stars: 5
      },
      {
        spotId: 13,
        userId: 5,
        review: "Cozy and relaxing, but could be more quiet.",
        stars: 3
      },
      {
        spotId: 14,
        userId: 6,
        review: "This place is AMAZING!! I highly recommend this place. The surroundings are magical!",
        stars: 5
      },
      {
        spotId: 15,
        userId: 7,
        review: "Great weekend getaway. Place is exactly as described. The back porch is relaxing. If it is raining you will get slightly wet but there is a good amount of tree cover. Recommend turning the heat off at night as the loft can get warmer. Quick connections to some great hikes, waterfalls and good food in Snoqualmie and North bend.",
        stars: 4
      },
      {
        spotId: 16,
        userId: 8,
        review: "Great experience. Rooms were cozy and clean. View was good.",
        stars: 4
      },
      {
        spotId: 17,
        userId: 9,
        review: "We stayed in this place in July but there was no AC. Super uncomfortable.",
        stars: 2
      },
      {
        spotId: 18,
        userId: 10,
        review: "Incredible service and view. Highly recommend!",
        stars: 5
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  }
};
