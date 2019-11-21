const router = require('express').Router()
const TagController = require('../controllers/TagController')

router.get('/', TagController.findAll)

module.exports = router