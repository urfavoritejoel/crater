const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { User, Post, Like, Song, Comment } = require('../../db/models');

const router = express.Router();

const requireProperAuth = (user, id) => {
    return user.id === id;
}

//Get all Posts
//Auth required: false
router.get('/', async (req, res) => {
    const posts = await Post.findAll({
        include: [
            {
                model: User
            },
            // {
            //     model: Theme
            // },
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
        // delete post.themeId;
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
            // {
            //     model: Theme
            // },
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
        // delete post.themeId;
    })

    let result = { Posts }
    return res.json(result)
});

//Get all comments from a post
//Auth required: false
router.get('/:postId/comments', async (req, res) => {
    const { postId } = req.params;
    const post = await Post.findByPk(postId);

    if (!post) {
        res.status(404);
        return res.json({
            message: "Post couldn't be found"
        })
    };

    const Comments = await Comment.findAll({
        where: {
            postId: postId
        },
        include: [{
            model: User,
        }],
    });
    return res.json({ Comments });
});

//Add a comment to a post
//Auth required: true
router.post('/:postId/comments', requireAuth, async (req, res) => {
    const { user } = req;
    let { postId } = req.params;
    postId = parseInt(postId)
    let { body } = req.body;
    const post = await Post.findByPk(postId);

    if (!post) {
        res.status(404);
        return res.json({
            message: "Post couldn't be found"
        })
    };
    const comment = await Comment.create({
        userId: user.id,
        postId,
        body
    });

    return res.json(comment)
});

//Get all likes from a post
//Auth required: false
router.get('/:postId/likes', async (req, res) => {
    const { postId } = req.params;
    const post = await Post.findByPk(postId);

    if (!post) {
        res.status(404);
        return res.json({
            message: "Post couldn't be found"
        })
    };

    const likes = await Like.findAll({
        where: {
            postId: postId
        },
        include: [{
            model: User,
        }],
    });

    let Likes = [];
    likes.forEach(like => {
        Likes.push(like.toJSON());
    })
    Likes.forEach(like => {
        delete like.commentId;
    })

    return res.json({ Likes });
});

//Add a like to a post
//Auth required: true
router.post('/:postId/likes', requireAuth, async (req, res) => {
    const { user } = req;
    let { postId } = req.params;
    postId = parseInt(postId);
    const post = await Post.findByPk(postId);
    const likeCheck = await Like.findAll({
        where: {
            userId: user.id,
            postId: postId
        }
    })

    if (!post) {
        res.status(404);
        return res.json({
            message: "Post couldn't be found"
        })
    };
    if (likeCheck.length > 0) {
        res.status(415);
        return res.json({
            message: "You already have a like for this post"
        })
    };

    const like = await Like.create({
        userId: user.id,
        postId,
    });

    return res.json(like)
});



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
