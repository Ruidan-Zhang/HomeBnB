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
        city: "Olalla",
        state: "Washington",
        country: "United States",
        lat: 11.1,
        lng: -22.2,
        name: "Million Dollar WaterFront Home with Beach",
        description: "Spoil Yourself.Breathtaking Beachfront Million dollar home. Beach comb, kayak or sit on one of the many balconies and watch the seals, whales and fish. Driftwood Beach is the perfect place to gather with friends and family and enjoy the best of the Pacific Northwest. Just minutes away from downtown Gig Harbor restaurants and shopping yet tucked away enough to provide solitude and privacy. 5 bedrooms, 5 bath, fireplaces, 2 gourmet kitchens and enough room for everyone to spread out and relax.",
        price: 850
      },
      {
        ownerId: 2,
        address: "second spot address",
        city: "Leavenworth",
        state: "Washington",
        country: "United States",
        lat: 33.3,
        lng: -44.4,
        name: "Peak Haus",
        description: 'Located just five minutes from the Bavarian Village of Leavenworth, the "Peak Haus" is brand new, luxurious modern mountain home nestled in the middle of 3.5 acres of woodland valley. You can gaze upon stunning snow capped mountains through the numerous over-sized view windows or from the large hot tub. With 4 bedrooms sleeping 10 people (6 ADULT MAX), you can bring friends or your whole family.',
        price: 737
      },
      {
        ownerId: 3,
        address: "third spot address",
        city: "Bass Lake",
        state: "California",
        country: "United States",
        lat: 55.5,
        lng: -66.6,
        name: "Eagles Nest at Bass Lake near Yosemite",
        description: "Welcome to Eagle's Nest, one of the most ideally located Lakefront homes on Bass Lake! Opportunities to see bald eagles and catch fish right from your own boat dock! In addition, the property is only 18.6 miles from the entrance to beloved Yosemite!",
        price: 932
      },
      {
        ownerId: 1,
        address: "fourth spot address",
        city: "Waterloo",
        state: "South Carolina",
        country: "United States",
        lat: 77.7,
        lng: -88.8,
        name: "Lakefront Home with Hot Tub",
        description: "Directly ON the water! 2 Giant decks and a Hot Tub overlooking the lake. Our happy home was designed with fun family vacations in mind! We offer SUP's, Kayaks, lots of floaties, a pellet grill, plenty of outdoor seating including a table made from a surf board, cornhole, and unbeatable sunrises & sunsets! FISHERMEN love fishing right off our dock and champion fish have been caught just in front of our seawall:-))",
        price: 216
      },
      {
        ownerId: 2,
        address: "fifth spot address",
        city: "Orlando",
        state: "Florida",
        country: "United States",
        lat: 99.9,
        lng: -100.001,
        name: "Luxurious Waterfront Resort next to Disney",
        description: "Located less than a mile from the gates of Disney World , you are right in the middle of all the action with Universal Studios / Islands of Adventure , Sea World, Magic Kingdom,Epcot, two major outlet malls, and many attractions just minutes away. This resort style suite features a private balcony overlooking beautiful Lake Bryan and the amazing pool that offers a full Tiki bar and food menu . Concierge services for Park tickets available . Free parking, 24 hour security. No resort fees!",
        price: 164
      },
      {
        ownerId: 1,
        address: "sixth spot address",
        city: "Cocoa Beach",
        state: "Florida",
        country: "United States",
        lat: 99.9,
        lng: -100.001,
        name: "Ocean Front Dream Home with Beachside Pool",
        description: "6,000 Sq ft ocean front dream home! Two massive decks with beachside pool perfect for entertaining! Gourmet kitchen with expansive ocean view; provides bar seating for 7.  Formal Dining room with wet bar can comfortably seat up to 10. Three bedrooms on the third floor, each with private bathrooms and ocean views. Property also has private beach access, elevator, and steam room.",
        price: 958
      },
      {
        ownerId: 2,
        address: "seventh spot address",
        city: "Hopatcong",
        state: "New Jersey",
        country: "United States",
        lat: 99.9,
        lng: -100.001,
        name: "Lakefront Luxury Retreat - 1h from NYC - Huge Lake",
        description: "This custom lakefront craftsman home has incredible main lake views with 40 feet of waterfront footage joined by an outdoor covered piazza that completes the entertaining space. Phenomenal relaxation only 1 hour from NYC. NJ's largest lake with unlimited activities including boating, fishing, swimming, ping pong, poker, salt water hot tub and much more in the area with hiking, skiing, farms and other attractions nearby.",
        price: 605
      },
      {
        ownerId: 1,
        address: "eighth spot address",
        city: "Lake Harmony",
        state: "Pennsylvania",
        country: "United States",
        lat: 99.9,
        lng: -100.001,
        name: "Lakefront Lakeview Villa 4 Bed 4 bath sleeps 12+",
        description: "LAKEFRONT!!! Lakeview Villa is a beautiful home overlooking Lake Harmony. Gorgeous views from every room in the house. 5 TV's, 3 Fireplaces, Foosball, and the dock. LINENS INCLUDED. If you are looking for a little R&R in a super cozy yet roomy setting, this is the place.",
        price: 410
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['first spot name', 'second spot name', 'third spot name'] }
    }, {});
  }
};
