'use strict';

const { Comment, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'Comments';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {


    up: async (queryInterface, Sequelize) => {
        options.tableName = "Comments";
        return queryInterface.bulkInsert(options, [
            {
                userId: 1,
                userUsername: 'Demo-lition',
                postId: 2,
                body: "body",
            },
            {
                userId: 2,
                userUsername: 'Demo-lition2',
                postId: 3,
                body: "body2",
            },
            {
                userId: 3,
                userUsername: 'Demo-lition3',
                postId: 4,
                body: "body3",
            },
            {
                userId: 4,
                userUsername: 'Demo-lition3',
                postId: 5,
                body: "body4",
            },
            {
                userId: 5,
                userUsername: 'Demo-lition3',
                postId: 6,
                body: "body5",
            },
            {
                userId: 6,
                userUsername: 'Demo-lition3',
                postId: 7,
                body: "body6",
            },
            {
                userId: 7,
                userUsername: 'Demo-lition3',
                postId: 8,
                body: "body7",
            },
            {
                userId: 8,
                userUsername: 'Demo-lition3',
                postId: 9,
                body: "body8",
            },
            {
                userId: 9,
                userUsername: 'Demo-lition3',
                postId: 10,
                body: "body9",
            },
            {
                userId: 10,
                userUsername: 'Demo-lition3',
                postId: 1,
                body: "body10",
            },
        ], {})
    },



    down: async (queryInterface, Sequelize) => {
        options.tableName = "Comments";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            userId: { [Op.in]: [] }
        })
    }
}
