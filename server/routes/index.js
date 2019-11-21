const router = require('express').Router()
const answerRouter = require('./answerRoute')
const questionRouter = require('./questionRoute')
const userRouter = require('./userRoute')
const tagRouter = require('./tagRoute')

router.get('/', (req, res, next)=>{
  res.status(200).json({
    message: 'Welcome'
  })
})

router.use('/users', userRouter)
router.use('/tags', tagRouter)
router.use('/questions', questionRouter)
router.use('/answers', answerRouter)

module.exports = router