const router = require('express').Router();
const {
  getUser,
  patchUser,
  postUser,
  login,
  logout,
  activate,
  refresh,
} = require('../controllers/users');
const {
  signinCelebrate,
  signupCelebrate,
  patchUserCelebrate,
} = require('../middlewares/celebrate');
const authMiddleware = require('../middlewares/auth');

router.post('/registration', postUser);
router.post('/login', login);
router.get('/activate/:link', activate);
router.get('/refresh', refresh);
router.post('/logout', authMiddleware, logout);
router.get('/user', authMiddleware, getUser);
router.patch('/user', authMiddleware, patchUser);

module.exports = router;
