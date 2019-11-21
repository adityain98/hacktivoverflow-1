const User = require('../models/User')
const Tag = require('../models/Tag')
const {sign, verify} = require('../helpers/jwt')
const {hash, compare} = require('../helpers/bcrypt')

class UserController {
  static login(req, res, next){
    const {email, password} = req.body
    console.log(email, password)
    User.findOne({email})
      .then(user=>{
        if(user && compare(password, user.password)){
          const obj = {
            _id: user._id,
            email: email
          }
          const token = sign(obj)
          res.status(200).json({
            token,
            _id: user._id
          })
        }
        else{
          next({
            status: 400,
            message: 'Email/Password wrong'
          })
        }
      })
      .catch(next)
  }

  static register(req, res, next){
    const {username, email, password} = req.body
    User.create({
      username,
      email,
      password
    })
      .then(user=>{
        res.status(201).json(user)
      })
      .catch(next)
  }

  static addTag(req, res, next){
    const {tag} = req.body
    const loggedUser = req.loggedUser
    Tag.findOne({tag})
      .then(tag=>{
        if(tag){
          return User.findOneAndUpdate({_id: loggedUser._id}, {
            $push: {tags: tag._id}
          })
        }
        else{
          next({
            status: 400,
            message: 'Tag not found'
          })
        }
      })
      .then(user=>{
        res.status(200).json(user)
      })
      .catch(next)
  }

  static removeTag(req, res, next){
    const {tag} = req.body
    const loggedUser = req.loggedUser
    Tag.findOne({tag})
      .then(tag=>{
        if(tag){
          return User.findOneAndUpdate({_id: loggedUser._id}, {
            $pull: {tags: tag._id}
          })
        }
        else{
          next({
            status: 400,
            message: 'Tag not found'
          })
        }
      })
      .then(user=>{
        res.status(200).json(user)
      })
      .catch(next)
  }

  static getUser(req, res, next){
    const loggedUser = req.loggedUser
    User.findOne({_id: loggedUser._id})
    .populate('tags')
      .then(user=>{
        res.status(200).json(user)
      })
      .catch(next)
  }
}

module.exports = UserController