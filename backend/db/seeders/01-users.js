'use strict';

const { User, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'Users';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {


  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        profileImg: '',
        descriptor: 'demo',
      },
      {
        email: 'demo2@user.io',
        username: 'Demo-lition2',
        hashedPassword: bcrypt.hashSync('password'),
        profileImg: '',
        descriptor: 'demo2',
      },
      {
        email: 'demo3@user.io',
        username: 'Demo-lition3',
        hashedPassword: bcrypt.hashSync('password'),
        profileImg: '',
        descriptor: 'demo3',
      },
      {
        email: 'demo4@user.io',
        username: 'Demo-lition4',
        hashedPassword: bcrypt.hashSync('password'),
        profileImg: '',
        descriptor: 'demo4',
      },
      {
        email: 'demo5@user.io',
        username: 'Demo-lition5',
        hashedPassword: bcrypt.hashSync('password'),
        profileImg: '',
        descriptor: 'demo5',
      },
      {
        email: 'demo6@user.io',
        username: 'Demo-lition6',
        hashedPassword: bcrypt.hashSync('password'),
        profileImg: '',
        descriptor: 'demo6',
      },
      {
        email: 'demo7@user.io',
        username: 'Demo-lition7',
        hashedPassword: bcrypt.hashSync('password'),
        profileImg: '',
        descriptor: 'demo7',
      },
      {
        email: 'demo8@user.io',
        username: 'Demo-lition8',
        hashedPassword: bcrypt.hashSync('password'),
        profileImg: '',
        descriptor: 'demo8',
      },
      {
        email: 'demo9@user.io',
        username: 'Demo-lition9',
        hashedPassword: bcrypt.hashSync('password'),
        profileImg: '',
        descriptor: 'demo9',
      },
      {
        email: 'demo10@user.io',
        username: 'Demo-lition10',
        hashedPassword: bcrypt.hashSync('password'),
        profileImg: '',
        descriptor: 'demo10',
      },
    ], {})
  },



  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: [] }
    })
  }
}
