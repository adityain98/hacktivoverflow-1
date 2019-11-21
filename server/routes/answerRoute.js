const router = require('express').Router()
const AnswerController = require('../controllers/AnswerController')
const {authentication} = require('../middlewares/authentication')

router.post('/', authentication, AnswerController.addAnswer)

module.exports = router