const Question = require('../models/Question')
const Tag = require('../models/Tag')

class QuestionController {
  static findAll(req, res, next){
    Question.find()
    .sort({createdAt:'desc'})
    .populate('author')
    .populate('tags')
      .then(questions=>{
        console.log(questions)
        res.status(200).json(questions)
      })
      .catch(next)
  }

  static findOne(req, res, next){
    const _id = req.params.id
    Question.findOne({_id})
    .populate('author')
    .populate({
      path: 'answers',
      populate: {
        path: 'author'
      }
    })
    .populate('tags')
      .then(question=>{
        res.status(200).json(question)
      })
      .catch(next)
  }

  static deleteQuestion(req, res, next){
    const _id = req.params.id
    Tag.findOneAndUpdate({questions: _id}, {
      questions: {$pull: _id}
    })
      .then(tag=>{
        return Question.findOneAndDelete({_id})
      }, {
        new: true
      })
      .then(question=>{
        res.status(200).json(question)
      })
      .catch(next)
  }

  static editQuestion(req, res, next){
    const {title, description} = req.body
    const _id = req.params.id

    Question.findOneAndUpdate({_id}, {
      title,
      description
    }, {
      new: true
    })
      .then(question=>{
        res.status(200).json(question)
      })
      .catch(next)
  }

  static searchQuestion(req, res, next){
    const {search} = req.body
    Question.find({
      title: {$regex: search}
    })
      .then(questions=>{
        res.status(200).json(questions)
      })
      .catch(next)
  }

  static async addQuestion(req, res, next){
    try{
      const arrTag = []
      const arrNewTag = []
      const {title, description, tags} = req.body
      const loggedUser = req.loggedUser
      for (let tag of tags) {
        const tempTag = await Tag.findOne({tag})
        console.log(tempTag)
        if(tempTag){
          arrTag.push(tempTag._id)
        }
        else{
          const newTag = await Tag.create({
            tag
          })
          arrNewTag.push(newTag._id)
          arrTag.push(newTag._id)
        }
      }
      console.log(arrTag, 'line 85')
      const question = await Question.create({
        title,
        description,
        tags: arrTag,
        author: loggedUser._id
      })
      res.status(201).json(question)
    }
    catch(err){
      next(err)
    }
  }

  static tagSearch(req, res, next){
    const {tag} = req.body
    Tag.findOne({tag})
      .then(tag=>{
        return Question.find({tags: tag._id})
      })
      .then(questions=>{
        res.status(200).json(questions)
      })
      .catch(next)
  }

  static addUpVote(req, res, next){
    const _id = req.params.id
    const loggedUser = req.loggedUser
    const author = loggedUser._id
    Question.findOne({_id, upVotes: author})
      .then(question=>{
        if(question){
          return question
        }
        else{
          return Question.update({_id}, {
            $push: {upVotes: author},
            $pull: {downVotes: author}
          })
        }
      })
      .then(num=>{
        res.status(200).json(num)
      })
      .catch(next)
  }

  static removeUpVote(req, res, next){
    const _id = req.params.id
    const loggedUser = req.loggedUser
    const author = loggedUser._id
    Question.findOne({_id, upVotes: author})
      .then(question=>{
        if(!question){
          return question
        }
        else{
          return Question.update({_id}, {$pull: {upVotes: author}})
        }
      })
      .then(num=>{
        res.status(201).json(num)
      })
      .catch(next)
  }

  static addDownVote(req, res, next){
    const _id = req.params.id
    const loggedUser = req.loggedUser
    const author = loggedUser._id
    Question.findOne({_id, downVotes: author})
      .then(question=>{
        if(question){
          return question
        }
        else{
          return Question.update({_id}, {
            $push: {downVotes: author},
            $pull: {upVotes: author}
          })
        }
      })
      .then(num=>{
        res.status(201).json(num)
      })
      .catch(next)
  }

  static removeDownVote(req, res, next){
    const _id = req.params.id
    const loggedUser = req.loggedUser
    const author = loggedUser._id
    Question.findOne({_id, downVotes: author})
      .then(question=>{
        if(!question){
          return question
        }
        else{
          return Question.update({_id}, {$pull: {downVotes: author}})
        }
      })
      .then(num=>{
        res.status(201).json(num)
      })
      .catch(next)
  }
}

module.exports = QuestionController