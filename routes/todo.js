const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todo');

router.get('/', todoController.getAll);

router.get('/:id', todoController.getSingle);

router.post('/', todoController.createTodo);

router.put('/:id', todoController.updateTodo);

router.delete('/:id', todoController.deleteTodo);

module.exports = router;
