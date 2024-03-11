const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { User, Post, Theme, Song } = require('../../db/models');
const { validateTheme } = require('../../utils/routeValidators');

const router = express.Router();

const requireProperAuth = (user, id) => {
    return user.id === id;
}

//Get all Themes
//Auth required: false
router.get('/', async (req, res) => {
    const themes = await Theme.findAll({
        include: [
            {
                model: User
            },
        ]
    });
    let Themes = []
    themes.forEach(theme => {
        Themes.push(theme.toJSON());
    })

    let result = { Themes }
    return res.json(result)
});

//Get theme by Id
//Auth required: false
router.get('/:themeId', async (req, res) => {
    const { themeId } = req.params;
    const theme = await Theme.findByPk(themeId)

    return res.json(theme);
});

//Get All Themes by Current User
//Auth required: true
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const themes = await Theme.findAll({
        where: {
            userId: user.id
        },
    })

    let Themes = []
    themes.forEach(theme => {
        Themes.push(theme.toJSON());
    })

    let result = { Themes }
    return res.json(result)
});

//Create a Theme
//Auth required: true
router.post('/', requireAuth, validateTheme, async (req, res) => {
    const { user } = req;
    const theme = await Theme.create({
        userId: user.id,
        title: req.body.title,
        bgColor: req.body.bgColor,
        bgImg: req.body.bgImg,
        shadowOffsetX: req.body.shadowOffsetX,
        shadowOffsetY: req.body.shadowOffsetY,
        shadowBlur: req.body.shadowBlur,
        shadowColor: req.body.shadowColor,
        shadowInset: req.body.shadowInset,
        textColor: req.body.textColor,
        textSize: req.body.textSize,
        textFont: req.body.textFont,
        borderStyle: req.body.borderStyle,
        borderColor: req.body.borderColor,
        borderSize: req.body.borderSize,
        borderRadius: req.body.borderRadius,
    });

    return res.json(theme)
});

//Update a Theme
//Auth required: true, must be owner of theme
router.put('/:themeId', requireAuth, validateTheme, async (req, res) => {
    const { themeId } = req.params;
    const theme = await Theme.findByPk(themeId);
    if (!theme) {
        res.status(404);
        return res.json({
            message: "Theme couldn't be found"
        })
    };
    if (!requireProperAuth(req.user, theme.userId)) {
        res.status(403);
        return res.json({
            message: "Forbidden"
        });
    };
    const updatedTheme = await theme.update({
        title: req.body.title,
        bgColor: req.body.bgColor,
        bgImg: req.body.bgImg,
        shadowOffsetX: req.body.shadowOffsetX,
        shadowOffsetY: req.body.shadowOffsetY,
        shadowBlur: req.body.shadowBlur,
        shadowColor: req.body.shadowColor,
        shadowInset: req.body.shadowInset,
        textColor: req.body.textColor,
        textSize: req.body.textSize,
        textFont: req.body.textFont,
        borderStyle: req.body.borderStyle,
        borderColor: req.body.borderColor,
        borderSize: req.body.borderSize,
        borderRadius: req.body.borderRadius,
    });

    return res.json(updatedTheme);
});

//Delete a Theme
//Auth required: true, must be owner of theme
router.delete('/:themeId', requireAuth, async (req, res) => {
    const { themeId } = req.params;
    const theme = await Theme.findByPk(themeId);
    if (!theme) {
        res.status(404);
        return res.json({
            message: "Theme couldn't be found"
        })
    };
    const posts = await Post.findAll({
        where: {
            themeId: theme.id
        }
    })

    console.log(posts.length);

    if (posts.length > 0) {
        res.status(400);
        return res.json({
            error: "Cannot delete theme that is in use."
        })
    }

    if (!requireProperAuth(req.user, theme.userId)) {
        res.status(403);
        return res.json({
            message: "Forbidden"
        });
    };
    await theme.destroy();
    return res.json({
        message: "Successfully deleted"
    })
});

module.exports = router;
