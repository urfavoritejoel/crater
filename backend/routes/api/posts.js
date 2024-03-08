const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { User, Post, Like, Song, Comment, Theme } = require('../../db/models');
const { validateComment, postTypes, validatePost } = require('../../utils/routeValidators');

const router = express.Router();

const requireProperAuth = (user, id) => {
    return user.id === id;
};

//Get all Posts
//Auth required: false
router.get('/', async (req, res) => {
    const posts = await Post.findAll({
        include: [
            {
                model: User
            },
            {
                model: Comment
            },
            {
                model: Song
            }
        ],
        order: [
            ['createdAt', 'DESC'],
            [Comment, 'createdAt', 'DESC']
        ]
    });
    let Posts = []
    posts.forEach(post => {
        Posts.push(post.toJSON());
    })

    let result = { Posts }
    return res.json(result)
});

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
                model: Comment,
            },
        ],
        order: [
            ['createdAt', 'DESC'],
            [Comment, 'createdAt', 'DESC']
        ]
    })
    const themes = await Theme.findAll({
        where: {
            userId: user.id
        }
    })

    let Posts = []
    posts.forEach(post => {
        Posts.push(post.toJSON());
    });

    Posts.forEach(post => {
        post["Theme"] = themes.find(theme => theme.id === post.themeId);
    });

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
router.post('/:postId/comments', requireAuth, validateComment, async (req, res) => {
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
        userUsername: user.username,
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

//Create a Post
//Auth required: true
router.post('/', requireAuth, validatePost, async (req, res) => {
    let { user } = req;
    let { themeId, title, postType, body, pinned, commentsDisabled } = req.body;
    themeId = parseInt(themeId);
    const userId = parseInt(user.id);

    if (!postTypes.includes(postType)) {
        res.status(415);
        return res.json({
            message: "Invalid Post Type"
        });
    }

    let resPost = {};
    let song = {};

    const post = await Post.create({
        userId,
        postType,
        themeId,
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
            userId: userId,
            postId: post.id,
            title,
            genre,
            songImg
        })
        resPost['Song'] = song.toJSON();
    }

    return res.json(resPost)
});

//Update a Post
//Auth required: true, must be owner of post
router.put('/:postId', requireAuth, validatePost, async (req, res) => {
    const { postId } = req.params;
    let { themeId, title, body, pinned, commentsDisabled } = req.body;
    themeId = parseInt(themeId);
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
