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

    // Vinyl Seeder
    await queryInterface.bulkInsert('Vinyls', [
      {
        userId: 1,
        color: 'Black',
        userImg: '/img/Vinyl_blue.png',
        formatId: 1,
        price: 50,
        trackListId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        color: 'Red',
        userImg: '/img/Vinyl_red.png',
        formatId: 2,
        price: 200,
        trackListId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

    // TrackList Seeder
    await queryInterface.bulkInsert('TrackLists', [
      {
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

    // Track Seeder
    await queryInterface.bulkInsert('Tracks', [
      {
        trackName: 'Track 1',
        originalName: 'Original Track 1',
        trackListId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        trackName: 'Track 2',
        originalName: 'Original Track 2',
        trackListId: 2,
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

    // OrderItem Seeder
    await queryInterface.bulkInsert('OrderItems', [
      {
        orderId: 1,
        vinylId: 1,
        quantity: 2,
        price: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 2,
        vinylId: 2,
        quantity: 1,
        price: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('FormatVinyls', null, {});
    await queryInterface.bulkDelete('Roles', null, {});
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Vinyls', null, {});
    await queryInterface.bulkDelete('TrackLists', null, {});
    await queryInterface.bulkDelete('Tracks', null, {});
    await queryInterface.bulkDelete('Orders', null, {});
    await queryInterface.bulkDelete('OrderItems', null, {});
  },
};