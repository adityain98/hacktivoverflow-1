const router = require('express').Router()
const QuestionController = require('../controllers/QuestionController')
const {authentication, authorization} = require('../middlewares/authentication')

router.get('/', QuestionController.findAll)
router.get('/:id', QuestionController.findOne)

router.post('/tag', QuestionController.tagSearch)
router.post('/search', QuestionController.searchQuestion)
router.use(authentication)

router.post('/', QuestionController.addQuestion)

router.patch('/:id', authorization, QuestionController)
router.patch('/up/add/:id', QuestionController.addUpVote)
router.patch('/up/remove/:id', QuestionController.removeUpVote)
router.patch('/down/add/:id', QuestionController.addDownVote)
router.patch('/down/remove/:id', QuestionController.removeDownVote)

router.put('/:id', authorization, QuestionController.editQuestion)

router.delete('/:id', authorization, QuestionController.deleteQuestion)

module.exports = router