const Answer = require('../models/Answer')

class AnswerController {
  static addAnswer(req, res, next){
    const {question_id, description} = req.body
    const loggedUser = req.loggedUser
    Answer.create({
      question: question_id,
      description,
      author: loggedUser._id
    })
      .then(answer=>{
        res.status(201).json(answer)
      })
      .catch(next)
  }

  static findAll(req, res, next){
    Answer.find()
      .then(answers=>{
        res.status(200).json(answers)
      })
      .catch(next)
  }

  static update(req, res, next){
    const _id = req.params.id
    const {description} = req.body

    Answer.findOneAndUpdate({_id}, {
      description
    }, {
      new: true
    })
      .then(answer=>{
        res.status(200).josn(answer)
      })
      .catch(next)
  }

  static addUpVote(req, res, next){
    const _id = req.params.id
    const loggedUser = req.loggedUser
    const author = loggedUser._id
    Answer.findOne({_id, upVotes: author})
      .then(answer=>{
        if(answer){
          return answer
        }
        else{
          return Answer.update({_id}, {
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
    Answer.findOne({_id, upVotes: author})
      .then(answer=>{
        if(!answer){
          return answer
        }
        else{
          return Answer.update({_id}, {$pull: {upVotes: author}})
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
    Answer.findOne({_id, downVotes: author})
      .then(answer=>{
        if(answer){
          return answer
        }
        else{
          return Answer.update({_id}, {
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
    Answer.findOne({_id, downVotes: author})
      .then(answer=>{
        if(!answer){
          return answer
        }
        else{
          return Answer.update({_id}, {$pull: {downVotes: author}})
        }
      })
      .then(num=>{
        res.status(201).json(num)
      })
      .catch(next)
  }
}

module.exports = AnswerController