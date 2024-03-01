const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Page, Post, Theme, Comment, Like } = require('../../db/models');

const router = express.Router();

//backend validation for signup
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

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

//Get All Pages by userId
//Auth required: false
router.get('/:userId/pages', async (req, res) => {
    const { userId } = req.params;
    const pages = await Page.findAll({
        where: {
            userId: userId
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

//Get All Posts by userId
//Auth required: false
router.get('/:userId/posts', async (req, res) => {
    const { userId } = req.params;
    const posts = await Post.findAll({
        where: {
            userId: userId
        },
        include: [
            // {
            //     model: Theme
            // }
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

//Get All Themes by userId
//Auth required: false
router.get('/:userId/themes', async (req, res) => {
    const { userId } = req.params;
    const themes = await Theme.findAll({
        where: {
            userId: userId
        },
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
