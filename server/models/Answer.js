const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  description:  {
    type: String,
    required: [true, 'Description is empty']
  },
  upVotes: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  downVotes: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  author: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  question: { 
    type: Schema.Types.ObjectId, 
    ref: 'Question' 
  }
},{
  timestamps: true
});


const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer