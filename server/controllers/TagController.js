const Tag = require('../models/Tag')

class TagController {
  static findAll(req, res, next){
    Tag.find()
      .then(tags=>{
        res.status(200).json(tags)
      })
      .catch(next)
  }

  static findOne(req, res, next){
    const _id = req.params.id
    Tag.findOne({_id})
      .then(tag=>{
        res.status(200).json(tag)
      })
      .catch(next)
  }

  static addTag(req, res, next){
    const {tag, question_id} = req.body
    Tag.create({
      tag,
      questions: question_id
    })
      .then(tag=>{
        res.status(201).json(tag)
      })
      .catch(next)
  }

  static addQuestion(req, res, next){
    const {question_id} = req.body
    const _id = req.params.id
    Tag.findOneAndUpdate({_id}, {
      $push: {questions: question_id}
    }, {
      new: true
    })
      .then(tag=>{
        res.status(200).json(tag)
      })
      .catch(next)
  }

  static removeTag(req, res, next){
    const {question_id} = req.body
    const _id = req.params.id
    Tag.findOneAndUpdate({_id}, {
      $pull: {questions: question_id}
    }, {
      new: true
    })
      .then(tag=>{
        res.status(200).json(tag)
      })
      .catch(next)
  }
}

module.exports = TagController