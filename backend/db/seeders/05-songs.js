'use strict';

const { Song, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'Songs';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {


    up: async (queryInterface, Sequelize) => {
        options.tableName = "Songs";
        return queryInterface.bulkInsert(options, [
            {
                userId: 1,
                title: "title",
                genre: "Pop",
                songImg: "image.url",
                postId: 1,
            },
            {
                userId: 2,
                title: "title",
                genre: "Pop",
                songImg: "image.url",
                postId: 2,
            },
            {
                userId: 3,
                title: "title",
                genre: "Pop",
                songImg: "image.url",
                postId: 3,
            },
        ], {})
    },



    down: async (queryInterface, Sequelize) => {
        options.tableName = "Songs";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            userId: { [Op.in]: [] }
        })
    }
}
