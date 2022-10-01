'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    const faker = require('faker')

    let dummyComment = []
    for (let i = 1; i < 30; i++) {
      randUser = []
      dummyComment.push({
        content: faker.lorem.lines(5)
        // UserId:
        // PostId: i
        // CommentId:
      })
    }
    console.log(dummyComment)
    await queryInterface.bulkInsert("comments", dummyComment);
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
