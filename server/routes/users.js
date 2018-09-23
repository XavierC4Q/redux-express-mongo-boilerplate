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
    res.send({ data: true })
  })


userRouter.route('/loggedIn')
  .get((req, res) => {
    const user = req.session.passport
    if (user) {
      return res.send({
        data: user.user
      })
    }
    return res.send({
      data: false
    })
  })

userRouter.route('/:username')
  .get((req, res) => {
    const {
      username
    } = req.params
    Users.findOne({
      username: username
    }, (error, user) => {
      if (error) {
        return res.write({
          data: error
        })
      }
      if (!user) {
        return res.write({
          data: false
        })
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
        return res.write({
          data: false
        })
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
          return res.write({
            data: error
          })
        }
        if (!user) {
          return res.write({
            data: false
          })
        }

        req.logIn(user, (error) => {
          if (error) {
            return res.write({
              data: error
            })
          }
          if (!user) {
            return res.write({
              data: false
            })
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