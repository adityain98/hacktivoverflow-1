const router = require('express').Router()
const UserController = require('../controllers/UserController')
const {authentication} = require('../middlewares/authentication')

router.get('/', authentication, UserController.getUser)

router.post('/login', UserController.login)
router.post('/register', UserController.register)

router.patch('/tag', authentication, UserController.addTag)
router.patch('/tag/delete', authentication, UserController.removeTag)

module.exports = router