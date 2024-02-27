const router = require('express').Router();
const { restoreUser, requireAuth, setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const pagesRouter = require('./pages.js');
const postsRouter = require('./posts.js');
const themesRouter = require('./themes.js');


//You can use requireAuth as middleware for routes that require sign in
//You can use setTokenCookie as a func to set cookie for user

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/pages', pagesRouter);
router.use('/posts', postsRouter);
router.use('/themes', themesRouter);


// Restore user
router.get('/restore-user', (req, res) => {
    return res.json(req.user);
});



module.exports = router;
