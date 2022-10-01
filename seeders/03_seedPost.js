'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    const faker = require('faker')

    let dummyPost = []
    for (let i = 0; i < 400; i++) {
        dummyPost.push({
            title: faker.commerce.productDescription().substr(0, rand(10,15)),
            views: 0,
            likes: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            UserId: rand(1, 30),
            CategoryId: rand(1,3),
            content: faker.lorem.lines(5)
        })
    }
    console.log(dummyPost)
    await queryInterface.bulkInsert("posts", dummyPost);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
