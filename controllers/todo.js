const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('to-do-list').find({});
  result.toArray().then((lists) => {
    console.log(result);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('to-do-list')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createTodo = async (req, res) => {
  const todo = {
    taskName: req.body.taskName,
    taskImportance: req.body.taskImportance,
    taskCategory: req.body.taskCategory,
    taskStartDate: req.body.taskStartDate,
    taskDueDate: req.body.taskDueDate,
    taskCompletedDate: req.body.taskCompletedDate,
    taskCompletedBy: req.body.taskCompletedBy
  };
  const response = await mongodb
  .getDb()
  .db()
  .collection('to-do-list')
  .insertOne(todo);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the todo.');
  }
};

const updateTodo = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const contact = {
    taskName: req.body.taskName,
    taskImportance: req.body.taskImportance,
    taskCategory: req.body.taskCategory,
    taskStartDate: req.body.taskStartDate,
    taskDueDate: req.body.taskDueDate,
    taskCompletedDate: req.body.taskCompletedDate,
    taskCompletedBy: req.body.taskCompletedBy
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('to-do-list')
    .replaceOne({ _id: userId }, todo);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating todo.');
  }
};

const deleteTodo = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection('to-do-list')
    .remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting todo.');
  }
};

module.exports = { getAll, getSingle, createTodo, updateTodo, deleteTodo };
