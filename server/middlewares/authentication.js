const {sign, verify} = require('../helpers/jwt')
const Question = require('../models/Question')

function authentication(req, res, next){
  try{
    const token = req.headers.access_token
    const loggedUser = verify(token)
    req.loggedUser = loggedUser
    next()
  }
  catch(err){
    next(err)
  }
}

function authorization(req, res, next){
  const _id = req.params.id
  const loggedUser = req.loggedUser
  Question.findOne({_id})
    .then(question=>{
      console.log()
      if(question.author == loggedUser._id){
        next()
      }
      else{
        next({
          message: 'Not auhthorized',
          status: 403
        })
      }
    })
    .catch(next)
}

module.exports = {
  authentication,
  authorization
}