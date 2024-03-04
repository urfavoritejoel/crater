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

//Get All Comments
//Auth required: false
router.get('/', async (req, res) => {
    const comments = await Comment.findAll({
        include: [
            {
                model: User
            },
        ]
    });
    let Comments = []
    comments.forEach(comment => {
        Comments.push(comment.toJSON());
    })

    let result = { Comments }
    return res.json(result)
});

//Get All Comments by Current User
//Auth required: true
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const comments = await Comment.findAll({
        where: {
            userId: user.id
        }
    })

    let Comments = []
    comments.forEach(comment => {
        Comments.push(comment.toJSON());
    })

    let result = { Comments }
    return res.json(result)
});

//Get all likes from a comment
//Auth required: false
router.get('/:commentId/likes', async (req, res) => {
    const { commentId } = req.params;
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
        res.status(404);
        return res.json({
            message: "Comment couldn't be found"
        })
    };

    const likes = await Like.findAll({
        where: {
            commentId: commentId
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

//Add a like to a comment
//Auth required: true
router.post('/:commentId/likes', requireAuth, async (req, res) => {
    const { user } = req;
    let { commentId } = req.params;
    commentId = parseInt(commentId);
    const comment = await Comment.findByPk(commentId);
    const likeCheck = await Like.findAll({
        where: {
            userId: user.id,
            commentId: commentId
        }
    })

    if (!comment) {
        res.status(404);
        return res.json({
            message: "Comment couldn't be found"
        })
    };
    if (likeCheck.length > 0) {
        res.status(415);
        return res.json({
            message: "You already have a like for this comment"
        })
    };

    const like = await Like.create({
        userId: user.id,
        commentId,
    });

    return res.json(like)
});

//Update a comment
//Auth required: true
router.put('/:commentId', requireAuth, async (req, res) => {
    const { user } = req;
    let { commentId } = req.params;
    let { body } = req.body;
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
        res.status(404);
        return res.json({
            message: "Comment couldn't be found"
        })
    };
    if (!requireProperAuth(user, comment.userId)) {
        res.status(403);
        return res.json({
            message: "Forbidden"
        });
    };

    const updatedComment = await comment.update({
        body
    });

    return res.json(updatedComment)
});

//Delete a Comment
//Auth required: true, must be owner of post
router.delete('/:commentId', requireAuth, async (req, res) => {
    const { commentId } = req.params;
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
        res.status(404);
        return res.json({
            message: "Comment couldn't be found"
        })
    };
    if (!requireProperAuth(req.user, comment.userId)) {
        res.status(403);
        return res.json({
            message: "Forbidden"
        });
    };
    await comment.destroy();
    return res.json({
        message: "Successfully deleted"
    })
});

module.exports = router;
