const mongoose = require('mongoose')

const connectDb = (connectionUrl)=>{
    mongoose.connect(connectionUrl,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    // console.log("connect to db")
}


module.exports = {connectDb}