const { signup, login, autoLogin, updateProfile } = require('../controller/authController');
const tokenVerify = require('../middleware/tokenVerify');
const { signUpValidator, loginValidator } = require('../validators/authValidator');

const router = require('express').Router();

router.post('/signup', signUpValidator, signup)
router.post('/login', loginValidator, login)
router.get('/auto-login', tokenVerify, autoLogin)
router.put('/profile', tokenVerify, updateProfile)

module.exports = router;