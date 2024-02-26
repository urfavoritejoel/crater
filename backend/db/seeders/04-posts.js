'use strict';

const { Post, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'Posts';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {


    up: async (queryInterface, Sequelize) => {
        options.tableName = "Posts";
        return queryInterface.bulkInsert(options, [
            {
                userId: 1,
                postType: "song",
                title: "title",
                body: "post body",
                pinned: false,
                commentsDisabled: false,
                pageId: 1,
                themeId: 1,
            },
            {
                userId: 2,
                postType: "song",
                title: "title",
                body: "post body",
                pinned: false,
                commentsDisabled: false,
                pageId: 2,
                themeId: 2,
            },
            {
                userId: 3,
                postType: "song",
                title: "title",
                body: "post body",
                pinned: false,
                commentsDisabled: false,
                pageId: 3,
                themeId: 3,
            },
        ], {})
    },



    down: async (queryInterface, Sequelize) => {
        options.tableName = "Posts";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            userId: { [Op.in]: [] }
        })
    }
}
