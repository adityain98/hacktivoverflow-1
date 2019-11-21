const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const {hash} = require('../helpers/bcrypt')

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username:  {
    type: String,
    required: [true, "Username is empty"],
    unique: true
  },
  email: {
    type: String,
    required: [true, "Email is empty"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is empty"],
  },
  questions: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Question' 
  }],
  answers: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Answer' 
  }],
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }]
},{
  timestamps: true
});

userSchema.plugin(uniqueValidator, {message: '{PATH} already registered'});

userSchema.pre('save', function(next){
  const hashed = hash(this.password)
  this.password = hashed
  next()
})

const User = mongoose.model('User', userSchema);

module.exports = User