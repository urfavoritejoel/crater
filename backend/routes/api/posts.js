const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { User, Post, Theme, Song } = require('../../db/models');

const router = express.Router();

const requireProperAuth = (user, id) => {
    return user.id === id;
}

const postTypes = ["song"];

//Get all Posts
//Auth required: false
router.get('/', async (req, res) => {
    const posts = await Post.findAll({
        include: [
            {
                model: User
            },
            {
                model: Theme
            },
            {
                model: Song
            }
        ]
    });
    let Posts = []
    posts.forEach(post => {
        Posts.push(post.toJSON());
    })
    Posts.forEach(post => {
        delete post.userId;
        delete post.themeId;
    })

    let result = { Posts }
    return res.json(result)
})

//Get All Posts by Current User
//Auth required: true
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const posts = await Post.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: Theme
            },
            {
                model: Song
            }
        ]
    })

    let Posts = []
    posts.forEach(post => {
        Posts.push(post.toJSON());
    })
    Posts.forEach(post => {
        delete post.userId;
        delete post.themeId;
    })

    let result = { Posts }
    return res.json(result)
});

//Get All Posts by userId
//Auth required: false
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    const posts = await Post.findAll({
        where: {
            userId: userId
        },
        include: [
            {
                model: Theme
            }
        ]
    })

    let Posts = []
    posts.forEach(post => {
        Posts.push(post.toJSON());
    })
    Posts.forEach(post => {
        delete post.userId;
        delete post.themeId;
    })

    let result = { Posts }
    return res.json(result)
});

//Create a Post
//Auth required: true
router.post('/', requireAuth, async (req, res) => {
    const { user } = req;
    let { themeId, pageId, title, postType, body, pinned, commentsDisabled } = req.body;
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
    }

    resPost = post.toJSON();
    resPost['Song'] = song.toJSON();

    return res.json(resPost)
})

//Update a Post
//Auth required: true, must be owner of post
router.put('/:postId', requireAuth, async (req, res) => {
    const { postId } = req.params;
    let { themeId, pageId, title, body, pinned, commentsDisabled } = req.body;
    themeId = parseInt(themeId);
    pageId = parseInt(pageId);
    const post = await Post.findByPk(postId);

    if (!post) {
        res.status(404);
        return res.json({
            message: "Post couldn't be found"
        })
    };
    if (!requireProperAuth(req.user, post.userId)) {
        res.status(403);
        return res.json({
            message: "Forbidden"
        });
    };
    const updatedPost = await post.update({
        themeId,
        pageId,
        title,
        body,
        pinned,
        commentsDisabled
    });

    return res.json(updatedPost);
})

//Delete a Post
//Auth required: true, must be owner of post
router.delete('/:postId', requireAuth, async (req, res) => {
    const { postId } = req.params;
    const post = await Post.findByPk(postId);
    if (!post) {
        res.status(404);
        return res.json({
            message: "Post couldn't be found"
        })
    };
    if (!requireProperAuth(req.user, post.userId)) {
        res.status(403);
        return res.json({
            message: "Forbidden"
        });
    };
    await post.destroy();
    return res.json({
        message: "Successfully deleted"
    })
});

module.exports = router;
