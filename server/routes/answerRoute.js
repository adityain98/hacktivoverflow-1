const router = require('express').Router()
const AnswerController = require('../controllers/AnswerController')
const {authentication} = require('../middlewares/authentication')

router.use(authentication)

router.post('/', AnswerController.addAnswer)

router.patch('/up/add/:id', AnswerController.addUpVote)
router.patch('/up/remove/:id', AnswerController.removeUpVote)
router.patch('/down/add/:id', AnswerController.addDownVote)
router.patch('/down/remove/:id', AnswerController.removeDownVote)



module.exports = router