const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const routeSchema = new Schema({
  name: {type: String, required: true},
  team: {type: String, required: true},
  description: {type: String, required: true},
});

const routeModel = mongoose.model('routes', routeSchema);

module.exports = routeModel;