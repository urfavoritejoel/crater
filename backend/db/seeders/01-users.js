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
