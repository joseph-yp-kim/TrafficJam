const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const routeSchema = new Schema({
  origin: {type: String, required: true},
  destination: {type: String, required: true},
  liveTime: {type: Number, required: true},
  normalTime: {type: Number, required: true},
  distance: {type: Number, required: true},
});

const routeModel = mongoose.model('routes', routeSchema);

module.exports = routeModel;