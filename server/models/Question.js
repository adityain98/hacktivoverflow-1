const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is empty']
  },
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


const Question = mongoose.model('Question', questionSchema);

module.exports = Question