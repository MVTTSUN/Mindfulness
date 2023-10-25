const router = require('express').Router();
const {
  getUser,
  patchUser,
  postUser,
  login,
  logout,
  activate,
  refresh,
  updateEmailAfterProof,
} = require('../controllers/users');
const {
  loginCelebrate,
  postUserCelebrate,
  activateUserCelebrate,
} = require('../middlewares/celebrate');
const authMiddleware = require('../middlewares/auth');

router.post('/registration', postUserCelebrate, postUser);
router.post('/login', loginCelebrate, login);
router.get('/activate/:link', activateUserCelebrate, activate);
router.get('/proof/:link', activateUserCelebrate, updateEmailAfterProof);
router.get('/refresh/:id', refresh);
router.post('/logout', authMiddleware, logout);
router.get('/user', authMiddleware, getUser);
router.patch('/user', authMiddleware, patchUser);

module.exports = router;
