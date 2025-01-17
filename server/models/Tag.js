const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  tag: {
    type: String,
    required: [true, 'Tag is empty']
  },
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }]
},{
  timestamps: true
});


const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag