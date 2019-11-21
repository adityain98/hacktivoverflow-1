const {sign, verify} = require('../helpers/jwt')

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

module.exports = {
  authentication
}