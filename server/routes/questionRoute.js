const router = require('express').Router()
const QuestionController = require('../controllers/QuestionController')
const {authentication} = require('../middlewares/authentication')

router.get('/', QuestionController.findAll)
router.get('/search', QuestionController.searchQuestion)
router.get('/tag', QuestionController.tagSearch)
router.get('/:id', QuestionController.findOne)

router.use(authentication)

router.post('/', QuestionController.addQuestion)

router.patch('/up/add/:id', QuestionController.addUpVote)
router.patch('/up/remove/:id', QuestionController.removeUpVote)
router.patch('/down/add/:id', QuestionController.addDownVote)
router.patch('/down/remove/:id', QuestionController.removeDownVote)

router.put('/:id', QuestionController.editQuestion)

router.delete('/:id', QuestionController.deleteQuestion)

module.exports = router