const express = require('express');
const userRouter = express.Router();
const Users = require('.././models/users')

userRouter.route('/')
  .get((req, res) => {
    Users.find({}, (error, users) => {
      if (error) {
        return res.send(error)
      }
      if (!users) {
        return res.send(new Error('cannot attain all users'))
      }
      return res.send(users)
    })
  })


userRouter.route('/logout')
  .get((req, res) => {
    req.session.destroy()
    res.send({
      data: true
    })
  })


userRouter.route('/loggedIn')
  .get((req, res) => {
    const loggedIn = req.session.passport
    if (loggedIn) {
      Users.findOne({ username: loggedIn.user }, (error, user) => {
        if(error){
          return res.write(`THE ERROR GETTING USER ${error}`)
        }
        if(!user){
          return res.write('NOT A USER')
        }
        return res.json(user)
      })
    }
    else {
      return res.send({
        data: false
      })
    }
  })

userRouter.route('/find/:username')
  .get((req, res) => {
    const {
      username
    } = req.params
    Users.findOne({
      username: username
    }, (error, user) => {
      if (error) {
        return res.write(`error error ${error}`)
      }
      if (!user) {
        return res.write('not user')
      }

      return res.json(user)
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
        return res.write(`YOUR ERROR IN REGISTER IS ${error}`)
      }
      if (user) {
        return res.write('USERNAME TAKEN')
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
      return res.json(registeredUser)
    })
  })

userRouter.route('/login')
  .post(async (req, res) => {
    const {
      username,
      password
    } = req.body
    const loggedInUser = req.session.passport
    if (!loggedInUser) {
      Users.authenticate()(username, password, (error, user) => {
        if (error) {
          return res.write(`ERROR ERROR ${error}`)
        }
        if (!user) {
          return res.write('not user')
        }

        req.logIn(user, (error) => {
          if (error) {
            return res.write(`ERROR ERROR ${error}`)
          }
          if (!user) {
            return res.write('not user')
          }
          const loginSuccess = {
            id: user._id,
            username: user.username
          }
          return res.json(loginSuccess)
        })
      })
    } else {
      return res.json({
        data: false
      })
    }
  })



module.exports = userRouter;