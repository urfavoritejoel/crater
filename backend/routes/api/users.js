const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Post, Theme, Comment, Like } = require('../../db/models');
const { validateSignup } = require('../../utils/routeValidators');

const router = express.Router();

// Sign up
router.post('/', validateSignup, async (req, res) => {

    const { email, password, username } = req.body;

    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, username, hashedPassword });

    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
        id: user.id,
        email: user.email,
        username: user.username,
    });
});

// Restore session user
router.get('/', (req, res) => {
    const { user } = req;
    if (user) {
        const safeUser = {
            id: user.id,
            email: user.email,
            username: user.username,
        };
        return res.json({
            user: safeUser
        });
    } else return res.json({ user: null });
});

//Get all users
router.get('/all', async (req, res) => {
    const users = await User.findAll();

    return res.json(users);
})

//Get All Posts by userId
//Auth required: false
router.get('/:userId/posts', async (req, res) => {
    const { userId } = req.params;
    const posts = await Post.findAll({
        where: {
            userId: userId
        },
        include: [
            {
                model: Comment,
            },
            {
                model: User
            },
            {
                model: Like
            },
        ],
        order: [
            ['createdAt', 'DESC'],
            [Comment, 'createdAt', 'DESC']
        ]
    })
    const themes = await Theme.findAll({
        where: {
            userId: userId
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

//Get All Themes by userId
//Auth required: false
router.get('/:userId/themes', async (req, res) => {
    const { userId } = req.params;
    const themes = await Theme.findAll({
        where: {
            userId: userId
        },
        order: [['updatedAt', 'DESC']]
    });

    let Themes = [];
    themes.forEach(theme => {
        Themes.push(theme.toJSON());
    });

    let result = { Themes };
    return res.json(result);
});

//Get all comments from a userId
//Auth required: false
router.get('/:userId/comments', async (req, res) => {
    const { userId } = req.params;
    const user = await User.findByPk(userId);

    if (!user) {
        res.status(404);
        return res.json({
            message: "User couldn't be found"
        })
    };

    const Comments = await Comment.findAll({
        where: {
            userId: userId
        },
        include: [
            {
                model: Like
            },
        ]
    });
    return res.json({ Comments });
});

//Get all likes from a userId
//Auth required: false
router.get('/:userId/likes', async (req, res) => {
    const { userId } = req.params;
    const user = await User.findByPk(userId);

    if (!user) {
        res.status(404);
        return res.json({
            message: "User couldn't be found"
        })
    };

    const Likes = await Like.findAll({
        where: {
            userId: userId
        },
    });
    return res.json({ Likes });
});


module.exports = router;
