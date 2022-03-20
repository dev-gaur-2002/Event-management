const express = require('express')
const dotenv = require('dotenv').config()
const {connectDb} = require('./connectDb')
const { createNewUser, loginUser, logoutUser,addEvent} = require('./functions')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const isLoggedIn = require('./middleware')


const server = express()
// server.use(cookieParser())
server.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true,
  }))


server.use(express.json())
server.use(express.urlencoded({extended:true}))

server.get('/',(req,res)=>{
  res.send('chalja bsdk')
})
server.get('/dashboard',(req,res)=>{
    console.log(req.session.user)
    res.status(200).send('hello')
})
server.post('/api/register' , createNewUser)
server.post('/api/login',loginUser)
server.post('/api/logout',logoutUser)
server.post('/api/addEvent',addEvent)

connectDb(process.env.MONGO_URL)
server.listen(process.env.PORT , ()=>console.log(`Server is listening to port : ${process.env.PORT}`))
