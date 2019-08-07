const mongoose = require('mongoose')

const Schema = mongoose.Schema

const runSchema = new mongoose. Schema({
  name: {type: String, required: true},
  distance: {type: Number, required: true},
  hours: Number,
  // minutes: {type: Number, required: true},
  // seconds: {type: Number, required: true},
  runDescription: String


});

const Run = mongoose.model('Run', runSchema);//this names the mongoose collection so we can search fo this in the database to see populated data. .model really is a collection

module.exports = Run;
