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
        address: "Olalla, Washington",
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
        address: "Leavenworth, Washington",
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
        address: "Bass Lake, California",
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
        ownerId: 4,
        address: "Waterloo, South Carolina",
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
        ownerId: 5,
        address: "Orlando, Florida",
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
        ownerId: 6,
        address: "Cocoa Beach, Florida",
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
        ownerId: 7,
        address: "Hopatcong, New Jersey",
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
        ownerId: 8,
        address: "Lake Harmony, Pennsylvania",
        city: "Lake Harmony",
        state: "Pennsylvania",
        country: "United States",
        lat: 99.9,
        lng: -100.001,
        name: "Lakefront Lakeview Villa 4 Bed 4 bath sleeps 12+",
        description: "LAKEFRONT!!! Lakeview Villa is a beautiful home overlooking Lake Harmony. Gorgeous views from every room in the house. 5 TV's, 3 Fireplaces, Foosball, and the dock. LINENS INCLUDED. If you are looking for a little R&R in a super cozy yet roomy setting, this is the place.",
        price: 410
      },
      {
        ownerId: 9,
        address: "Austin, Texas",
        city: "Austin",
        state: "Texas",
        country: "United States",
        lat: 99.9,
        lng: -100.001,
        name: "East Side Beehive",
        description: "Clean, Zen modern backyard cottage, easy access to SXSW, convention center, great dining, and public transportation. Gorgeous, peaceful space, close to the action but perfect for rest and recharging. Easy access to SXSW, ACL, F1 and all festivals.",
        price: 308
      },
      {
        ownerId: 10,
        address: "Leavenworth, Washington",
        city: "Leavenworth",
        state: "Washington",
        country: "United States",
        lat: 99.9,
        lng: -100.001,
        name: "The Overlook - Modern Leavenworth Cabin",
        description: "Ready to make your friends jealous? With a retractable wall for indoor/outdoor living, a real wood burning fireplace, unreal views of the river, this modern cliffhanging home above the Wenatchee river and in the heart of Leavenworth (only a 2min drive to town!) this cabin will help you unwind and relax! The heat lamps on the deck during the winter or the a/c inside during the summer, you are sure to enjoy your stay at The Overlook",
        price: 625
      },
      {
        ownerId: 1,
        address: "Waterville, Washington",
        city: "Waterville",
        state: "Washington",
        country: "United States",
        lat: 99.9,
        lng: -100.001,
        name: "Earthlight",
        description: "With sweeping views of the Columbia River, our unique homes are specifically designed to experience the combination of luxury living and the beauty of nature. Relax in our hot tub while watching the sun descend behind the snowy mountains. Explore our wild trekking paths in spring and summer, and snowshoe through the hills in winter. Watch the deer wander by. Earthligh has it all, and then some.",
        price: 500
      },
      {
        ownerId: 2,
        address: "Kane County, Utah",
        city: "Kane County",
        state: "Utah",
        country: "United States",
        lat: 99.9,
        lng: -100.001,
        name: "The Boundary Cabin 5",
        description: "The features of a Boundary cabin are uncommonly luxurious for rustic lodging. 400 sq ft has never been more comfortable. Full Bathroom, heat and cooling, community fire pit, 1 queen bed, and a loft for 1 adult or two small children, and all of this less than a mile away from Zion National Park! Please note that the loft does not have bedding. It only has a mat to sleep on. You'll need to bring your own bedding for the loft area.",
        price: 187
      },
      {
        ownerId: 3,
        address: "Shasta County, California",
        city: "Shasta County",
        state: "California",
        country: "United States",
        lat: 99.9,
        lng: -100.001,
        name: "Shasta A Frame Cabin with a View",
        description: "This is your dreamy A Frame cabin escape nestled in four wooded acres overlooking Shasta Lake. Master loft and large front deck look out over the valley with breathtaking views of mountain peaks, granite cliffs and Hirz Bay.  Located between 3 beautiful National Parks - Lassen Volcanic, Redwood, and Crater Lake. We welcome you to experience cabin life and the wild beauty all around.",
        price: 216
      },
      {
        ownerId: 4,
        address: "Lyons, Colorado",
        city: "Lyons",
        state: "Colorado",
        country: "United States",
        lat: 99.9,
        lng: -100.001,
        name: "Little Red Treehouse",
        description: "It has huge views, private shower, with separate powder room sink and toilet. It has an efficiency kitchen, with small sink and counter top,as well as a fridge. The tree house is equipped with heat/air and electricity. Located on the way to Rocky Mountain NP, directly across from Rocky Grass There is a full size pull down Murphy bed which sleeps two , the fairy loft sleeps one.",
        price: 250
      },
      {
        ownerId: 5,
        address: "Holbrook, Arizona",
        city: "Holbrook",
        state: "Arizona",
        country: "United States",
        lat: 99.9,
        lng: -100.001,
        name: "Starlight Tent Near Petrified Forest",
        description: "This is a rare chance to sleep in a comfortable  tent in the middle of wide open space and to feel the essence of the surrounding desert.  It's like you are stepping back in time: there are even old abandoned Pony Express buildings from the 1800's nearby that you can walk to.",
        price: 64
      },
      {
        ownerId: 6,
        address: "Kimberling City, Missouri",
        city: "Kimberling City",
        state: "Missouri",
        country: "United States",
        lat: 99.9,
        lng: -100.001,
        name: "New Serenity Shores-Luxury Lakefront Lodge 9-Pools",
        description: 'Faria Resorts introduces Serenity Shores Resort, the most luxurious, fun-filled, and amazing Lakefront family resort on Table Rock Lake! This is not your "average" resort. We raised the bar when we master-planned this development. Serenity is exactly what you will find here. Calm, peaceful, and tranquil vacationing on 44 private acres! We have taken feedback from our guests for over a decade and have created the most amazing experience available on the lake.',
        price: 894
      },
      {
        ownerId: 7,
        address: "Southampton, New York",
        city: "Southampton",
        state: "New York",
        country: "United States",
        lat: 99.9,
        lng: -100.001,
        name: "Year Round Southampton/Sag Harbor oasis+hot tub!",
        description: "RARE PRISTINE HOME FOR YEAR-ROUND MEMORIES + HOT TUB! This recently renovated, sun-filled Southampton beach house is steps away from community beach, tennis and volleyball. Located in the Whalebone Landing Community on Peconic Bay with breathtaking sunsets, this chic family-friendly home is a quick drive to farm stands, wineries, and pumpkin patches.",
        price: 1136
      },
      {
        ownerId: 8,
        address: "Tucson, Arizona",
        city: "Tucson",
        state: "Arizona",
        country: "United States",
        lat: 99.9,
        lng: -100.001,
        name: "Desert Retreat with Private Pool.",
        description: "This 14 acre desert retreat offers a cozy rustic home with a private pool, king bed, spacious living area and breathtaking views. Nestled near hiking trails and a golf club, it's the perfect blend of seclusion and adventure. Only 15 minutes from downtown and with free parking and private entrance, it's the ultimate cozy getaway.",
        price: 350
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  }
};
