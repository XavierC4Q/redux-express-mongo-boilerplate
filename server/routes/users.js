const express = require('express');
const userRouter = express.Router();
const Users = require('.././models/users')

userRouter.route('/')
  .get((req, res) => {
    Users.find({}, (error, users) => {
      if (error) {
        res.json(error)
      }
      res.json(users)
    })
  })

userRouter.route('/:username')
  .get((req, res) => {
    const {
      username
    } = req.params
    Users.findOne({ username: username }, (error, user) => {
      if (error) {
        res.json(error)
      }
      if (!user) {
        res.json(new Error('NOT A USER'))
      }

      res.json(user)
    })
  })

userRouter.route('/register')
  .post(async (req, res) => {
    const {
      username,
      password
    } = req.body
    Users.findOne({
      username: username
    }, async (error, user) => {
      if (error) {
        res.json(error)
      }
      if (user) {
        res.json(new Error('user taken'))
      }

      let newUser = new Users({
        username
      })
      await newUser.setPassword(password)
      await newUser.save()
      const registeredUser = {
        id: newUser._id,
        username: newUser.username
      }
      res.json(registeredUser)
    })
  })

userRouter.route('/login')
  .post(async (req, res) => {
    const {
      username,
      password
    } = req.body
    const loggedInUser = req.session.passport
    if (loggedInUser) {
      res.json(new Error('Someone is logged in already'))
    }

    Users.authenticate()(username, password, (error, user) => {
      if (error) {
        res.json(error)
      }
      if (!user) {
        res.json(new Error('NOT A USER'))
      }

      req.logIn(user, (error) => {
        if (error) {
          res.json(new Error('failure to login req'))
        }
        if(!user){
          res.json(new Error(`USER LOGIN FAIL`))
        }
        const loginSuccess = {
          id: user._id,
          username: user.username
        }
        res.json(loginSuccess)
      })
    })
  })

userRouter.route('/logout')
  .get((req, res) => {
    if(req.session.passport){
      req.session.destroy()
      res.json('successful logout')
    }
    res.json('already logged in')
  })


module.exports = userRouter;