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
                postId: 4,
            },
            {
                userId: 4,
                postId: 5,
            },
            {
                userId: 5,
                postId: 6,
            },
            {
                userId: 6,
                postId: 7,
            },
            {
                userId: 7,
                postId: 8,
            },
            {
                userId: 8,
                postId: 9,
            },
            {
                userId: 9,
                postId: 10,
            },
            {
                userId: 10,
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
                commentId: 4,
            },
            {
                userId: 4,
                commentId: 5,
            },
            {
                userId: 5,
                commentId: 6,
            },
            {
                userId: 6,
                commentId: 7,
            },
            {
                userId: 7,
                commentId: 8,
            },
            {
                userId: 8,
                commentId: 9,
            },
            {
                userId: 9,
                commentId: 10,
            },
            {
                userId: 10,
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
