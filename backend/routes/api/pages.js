const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Page, Post, Song } = require('../../db/models');

const router = express.Router();

const requireProperAuth = (user, id) => {
    return user.id === id;
}

const postTypes = ['update', 'song'];

//Get All Pages
//Auth required: false
router.get('/', async (req, res) => {
    const pages = await Page.findAll({
        include: [
            {
                model: User
            },
            // {
            //     model: Theme
            // }
        ]
    });
    let Pages = []
    pages.forEach(page => {
        Pages.push(page.toJSON());
    })
    Pages.forEach(page => {
        delete page.userId;
        // delete page.defaultThemeId;
    })

    let result = { Pages }
    return res.json(result)
})

//Get All Pages by Current User
//Auth required: true
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const pages = await Page.findAll({
        where: {
            userId: user.id
        },
        // include: [
        //     {
        //         model: Theme
        //     }
        // ]
    })

    let Pages = []
    pages.forEach(page => {
        Pages.push(page.toJSON());
    })
    Pages.forEach(page => {
        delete page.userId;
        // delete page.defaultThemeId;
    })

    let result = { Pages }
    return res.json(result)
});

//Create a Post on Page
//Auth required: true
router.post('/:pageId/posts', requireAuth, async (req, res) => {
    const { user } = req;
    let { pageId } = req.params;
    let { themeId, title, postType, body, pinned, commentsDisabled } = req.body;
    themeId = parseInt(themeId);
    pageId = parseInt(pageId);

    if (!postTypes.includes(postType)) {
        res.status(415);
        return res.json({
            message: "Invalid Post Type"
        });
    }

    let resPost = {};
    let song = {};

    const post = await Post.create({
        userId: user.id,
        postType,
        themeId,
        pageId,
        title,
        body,
        pinned,
        commentsDisabled
    })

    resPost = post.toJSON();
    //Any additonal post types to be added to this if block
    if (postType === "song") {
        let { title, genre, songImg } = req.body.song;
        song = await Song.create({
            userId: user.id,
            postId: post.id,
            title,
            genre,
            songImg
        })
        resPost['Song'] = song.toJSON();
    }

    return res.json(resPost)
});

//Create a Page
//Auth required: true
router.post('/', requireAuth, async (req, res) => {
    const { user } = req;
    let { defaultThemeId, headerImg } = req.body;
    defaultThemeId = parseInt(defaultThemeId);
    const page = await Page.create({
        userId: user.id,
        defaultThemeId,
        headerImg
    });

    return res.json(page)
})

//Update a Page
//Auth required: true, must be owner of page
router.put('/:pageId', requireAuth, async (req, res) => {
    const { pageId } = req.params;
    let { defaultThemeId, headerImg } = req.body;
    defaultThemeId = parseInt(defaultThemeId);
    const page = await Page.findByPk(pageId);
    if (!page) {
        res.status(404);
        return res.json({
            message: "Page couldn't be found"
        })
    };
    if (!requireProperAuth(req.user, page.userId)) {
        res.status(403);
        return res.json({
            message: "Forbidden"
        });
    };
    const updatedPage = await page.update({
        defaultThemeId,
        headerImg
    });

    return res.json(updatedPage);
})

//Delete a Page
//Auth required: true, must be owner of page
router.delete('/:pageId', requireAuth, async (req, res) => {
    const { pageId } = req.params;
    const page = await Page.findByPk(pageId);
    if (!page) {
        res.status(404);
        return res.json({
            message: "Page couldn't be found"
        })
    };
    if (!requireProperAuth(req.user, page.userId)) {
        res.status(403);
        return res.json({
            message: "Forbidden"
        });
    };
    await page.destroy();
    return res.json({
        message: "Successfully deleted"
    })
});

module.exports = router;
