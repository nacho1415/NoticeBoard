'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let dummyCategory = []
    let categoryList = ["자유게시판", "사진게시판", "왁자지껄"]
    for (let i = 0; i < 3; i++) {
        dummyCategory.push({
            categoryName: categoryList[i],
            createdAt: new Date(),
            updatedAt: new Date()
        })
    }
    
    await queryInterface.bulkInsert("categories", dummyCategory);
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
