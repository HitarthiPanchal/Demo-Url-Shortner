const mongoose = require('mongoose')
const MongoDB = require('./index')

mongoose.connect('mongodb://localhost/urlShortener',
    {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true
   }).then(()=>{
console.log('DB connection successful!')
}).catch(error => console.log(error.reason));