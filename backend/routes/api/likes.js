const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Comment, Like } = require('../../db/models');

const router = express.Router();

const requireProperAuth = (user, id) => {
    return user.id === id;
};

//Get All Likes
//Auth required: false
router.get('/', async (req, res) => {
    const likes = await Like.findAll({
        include: [
            {
                model: User
            },
        ]
    });
    let Likes = []
    likes.forEach(like => {
        Likes.push(like.toJSON());
    })
    Likes.forEach(like => {
        delete like.userId;
    })

    let result = { Likes }
    return res.json(result)
});

//Get All Likes by Current User
//Auth required: true
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const likes = await Like.findAll({
        where: {
            userId: user.id
        }
    })

    let Likes = []
    likes.forEach(like => {
        Likes.push(like.toJSON());
    })

    let result = { Likes }
    return res.json(result)
});

//Delete a Like
//Auth required: true, must be owner of like
router.delete('/:likeId', requireAuth, async (req, res) => {
    const { likeId } = req.params;
    const like = await Like.findByPk(likeId);
    if (!like) {
        res.status(404);
        return res.json({
            message: "Like couldn't be found"
        })
    };
    if (!requireProperAuth(req.user, like.userId)) {
        res.status(403);
        return res.json({
            message: "Forbidden"
        });
    };
    await like.destroy();
    return res.json({
        message: "Successfully deleted"
    })
});

module.exports = router;
