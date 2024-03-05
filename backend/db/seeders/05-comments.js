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
                userId: 1,
                userUsername: 'Demo-lition',
                postId: 2,
                body: "body2",
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
                postId: 1,
                body: "body3",
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