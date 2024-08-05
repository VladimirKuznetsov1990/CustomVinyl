'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // FormatVinyl Seeder
    await queryInterface.bulkInsert('FormatVinyls', [
      {
        format: 'LP',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        format: 'EP',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        format: 'Single',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

    // Role Seeder
    await queryInterface.bulkInsert('Roles', [
      {
        role: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role: 'User',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

    // User Seeder
    await queryInterface.bulkInsert('Users', [
      {
        userName: 'admin',
        email: 'admin@example.com',
        password: await bcrypt.hash('adminpass', 10),
        address: '123 Admin St',
        phone: '1234567890',
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userName: 'user',
        email: 'user@example.com',
        password: await bcrypt.hash('userpass', 10),
        address: '456 User St',
        phone: '0987654321',
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});


    // Order Seeder
    await queryInterface.bulkInsert('Orders', [
      {
        userId: 1,
        status: 'Pending',
        totalPrice: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        status: 'Completed',
        totalPrice: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('FormatVinyls', null, {});
    await queryInterface.bulkDelete('Roles', null, {});
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Orders', null, {});
  },
};
