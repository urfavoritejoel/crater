'use strict';

const { Page, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'Pages';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {


    up: async (queryInterface, Sequelize) => {
        options.tableName = "Pages";
        return queryInterface.bulkInsert(options, [
            {
                userId: 1,
                defaultThemeId: 1,
                headerImg: "image.url",
            },
            {
                userId: 1,
                defaultThemeId: 1,
                headerImg: "images.url",
            },
            {
                userId: 2,
                defaultThemeId: 1,
                headerImg: "images.url",
            },
        ], {})
    },



    down: async (queryInterface, Sequelize) => {
        options.tableName = "Pages";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            userId: { [Op.in]: [] }
        })
    }
}
