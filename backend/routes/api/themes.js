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
router.post('/', requireAuth, async (req, res) => {
    const { user } = req;
    let { title, bgColor, bgImg, textFont, borderStyle } = req.body;
    const theme = await Theme.create({
        userId: user.id,
        title,
        bgColor,
        bgImg,
        textFont,
        borderStyle,
    });

    return res.json(theme)
});

//Update a Theme
//Auth required: true, must be owner of theme
router.put('/:themeId', requireAuth, async (req, res) => {
    const { themeId } = req.params;
    let { title, bgColor, bgImg, textFont, borderStyle } = req.body;
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
        title,
        bgColor,
        bgImg,
        textFont,
        borderStyle,
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
