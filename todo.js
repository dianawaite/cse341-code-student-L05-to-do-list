

const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    id: { type: String, required: true },
    taskName: { type: String },
    taskImportance: { type: String, required: true },
    taskCategory: { type: String },
    taskStartDate: {type: String},
    taskDueDate: {type: String},
    taskCompletedDate: {type: Date},
    taskCompletedBy: {type: String}
 });
 
 module.exports = mongoose.model('Task', taskSchema);