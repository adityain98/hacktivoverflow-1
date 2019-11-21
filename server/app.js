if(process.env.NODE_ENV == 'development'){
  require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')

const port = process.env.PORT || 3000
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(morgan('dev'))

mongoose.connect(process.env.MONGOOSE_URI, {
  useUnifiedTopology: true, 
  useNewUrlParser: true, 
  useFindAndModify: false, 
  useCreateIndex: true
})
  .then(_=>{
    console.log('db connected');
  })
  .catch(err=>{
    console.log(err);
  })

app.use('/', router)

app.use(errorHandler)

app.listen(port, ()=>{
  console.log(`listening in port ${port}`);
})