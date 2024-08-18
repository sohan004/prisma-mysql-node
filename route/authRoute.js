const { signup, login } = require('../controller/authController');
const { signUpValidator, loginValidator } = require('../validators/authValidator');

const router = require('express').Router();

router.post('/signup', signUpValidator, signup)
router.post('/login', loginValidator, login)

module.exports = router;