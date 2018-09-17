const express = require('express');
const todosRouter = express.Router();


/* GET users listing. */
todosRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = todosRouter;
