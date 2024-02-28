'use strict';

const { Like, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'Likes';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {


    up: async (queryInterface, Sequelize) => {
        options.tableName = "Likes";
        return queryInterface.bulkInsert(options, [
            {
                userId: 1,
                postId: 2,
            },
            {
                userId: 2,
                postId: 3,
            },
            {
                userId: 3,
                postId: 1,
            },
            {
                userId: 1,
                commentId: 2,
            },
            {
                userId: 2,
                commentId: 3,
            },
            {
                userId: 3,
                commentId: 1,
            },
        ], {})
    },



    down: async (queryInterface, Sequelize) => {
        options.tableName = "Likes";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            userId: { [Op.in]: [] }
        })
    }
}
