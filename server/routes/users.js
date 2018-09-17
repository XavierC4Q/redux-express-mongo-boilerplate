const express = require('express');
const userRouter = express.Router();
const Users = require('.././models/users')

userRouter.route('/')
  .get((req, res) => {
    Users.find({}, (error, users) => {
      if(error){
        res.json(error)
      }
      res.json(users)
    })
  })

userRouter.route('/register')
  .post(async (req, res) => {
    const {
      username,
      password
    } = req.body
    Users.findOne({ username: username }, async (error, user) => {
      if(error){
        res.json(error)
      }
      if(user){
        res.json(new Error('user taken'))
      }

      let newUser = new Users({ username })
      await newUser.setPassword(password)
      await newUser.save()
      res.json(newUser)
    })
  })

userRouter.route('/login')
  .post(async (req, res) => {
    const { username, password } = req.body
    const loggedInUser = req.session.passport
    if(loggedInUser){
      res.json(new Error('Someone is logged in already'))
    }
    let authUser = new Promise(function(resolve, reject){
      Users.authenticate()(username, password, function(error, user){
        if(error) reject(error)
        if(!user) reject(user)
        req.login(user, function(error){
          if(error) reject(error)
          resolve(user)
        })
      })
    })

    Promise.resolve(authUser).then(res => {
      return res
    }).catch(error => {
      return error
    })

    res.json(user)
  })

module.exports = userRouter;
