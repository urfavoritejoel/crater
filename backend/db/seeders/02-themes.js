'use strict';

const { Theme, Sequelize } = require('../models');


let options = {};
options.tableName = 'Themes';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {


    up: async (queryInterface, Sequelize) => {
        options.tableName = "Themes";
        return queryInterface.bulkInsert(options, [
            {
                userId: 1,
                title: "title",
                borderstyle: "solid",
            },
            {
                userId: 2,
                title: "title2",
                borderstyle: "solid",
            },
            {
                userId: 3,
                title: "title3",
                borderstyle: "solid",
            },
        ], {})
    },



    down: async (queryInterface, Sequelize) => {
        options.tableName = "Themes";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            userId: { [Op.in]: [] }
        })
    }
}
