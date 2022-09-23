'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const faker = require('faker')
    const bcrypt = require('bcrypt')

    let dummyUser = []
    dummyUser.push({
      email: 'eos0103',
      password: await bcrypt.hash('lee2030!', 10),
      nickname: faker.name.findName(),
      createdAt: new Date(),
      updatedAt: new Date()
    })
    for (let i = 0; i < 29; i++) {
      dummyUser.push({
        email: faker.internet.email(),
        password: await bcrypt.hash(faker.random.alpha(10), 10),
        nickname: faker.name.findName(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    await queryInterface.bulkInsert("users", dummyUser);
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
