const express = require('express');
const todosRouter = express.Router();
const Todos = require('.././models/todos')

todosRouter.route('/add')
  .post((req, res) => {
    const {
      task,
      username
    } = req.body
    const newTodo = new Todos({
      task,
      username
    })
    newTodo.save()
    res.json(newTodo)
  })

todosRouter.route('/delete/:id')
  .delete((req, res) => {
    const {
      id
    } = req.params
    Todos.deleteOne({
      _id: id
    }, (error) => {
      if (error) {
        return res.write(`ERROR HERE HERE ${error}`)
      }
      res.send('success delete')
    })
  })

todosRouter.route('/update/:id')
  .patch((req, res) => {
    const {
      id
    } = req.params
    Todos.findByIdAndUpdate(id, {
      complete: true
    }, (error) => {
      if (error) {
        return res.write(`ERROR HERE HERE ${error}`)
      }
      res.json('updated')
    })
  })


  todosRouter.route('/find/:username')
  .get((req, res) => {
    const {
      username
    } = req.params
    Todos.find({
      username: username
    }, (error, userTodos) => {
      if (error) {
        return res.write(`ERROR HERE ${error}`)
      }
      if (!userTodos) {
        return res.write('')
      }
      res.json(userTodos)
    })
  })

module.exports = todosRouter;