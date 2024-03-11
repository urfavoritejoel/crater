'use strict';

const { Post, Sequelize } = require('../models');


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
                postType: "update",
                title: "title",
                body: "post body",
                pinned: false,
                commentsDisabled: false,
                themeId: 1,
            },
            {
                userId: 2,
                postType: "update",
                title: "title",
                body: "post body",
                pinned: false,
                commentsDisabled: false,
                themeId: 2,
            },
            {
                userId: 3,
                postType: "update",
                title: "title",
                body: "post body",
                pinned: false,
                commentsDisabled: false,
                themeId: 3,
            },
            {
                userId: 4,
                postType: "update",
                title: "title",
                body: "post body",
                pinned: false,
                commentsDisabled: false,
                themeId: 4,
            },
            {
                userId: 5,
                postType: "update",
                title: "title",
                body: "post body",
                pinned: false,
                commentsDisabled: false,
                themeId: 5,
            },
            {
                userId: 6,
                postType: "update",
                title: "title",
                body: "post body",
                pinned: false,
                commentsDisabled: false,
                themeId: 6,
            },
            {
                userId: 7,
                postType: "update",
                title: "title",
                body: "post body",
                pinned: false,
                commentsDisabled: false,
                themeId: 7,
            },
            {
                userId: 8,
                postType: "update",
                title: "title",
                body: "post body",
                pinned: false,
                commentsDisabled: false,
                themeId: 8,
            },
            {
                userId: 9,
                postType: "update",
                title: "title",
                body: "post body",
                pinned: false,
                commentsDisabled: false,
                themeId: 9,
            },
            {
                userId: 10,
                postType: "update",
                title: "title",
                body: "post body",
                pinned: false,
                commentsDisabled: false,
                themeId: 10,
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
