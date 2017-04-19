const mongoose = require('mongoose');
const uri = process.env.MONGO_URI || 'mongodb://localhost/trafficJam';
const database = mongoose.connect(uri);

const Routes = require('./model.js');
const db = {};

db.create = (req, res) => {
  const data = req.body;
  console.log('DATA:', data);
  Routes.create(data, (err, route) => {
    if (err) {
      res.statusCode = 400;
      return res.send(err);
    } else {
      res.statusCode = 200;
      return res.send('data saved');
    }
  });
};

db.findAll = (req, res) => {
  Routes.find({}, (err, routes) => {
    if (err) {
      res.statusCode = 400;
      return res.send(err);
    } else {
      res.statusCode = 200;
      return res.send(routes);
    }
  });
}

db.find = (req, res) => {
  const oAdd = req.params.oAdd;
  const dAdd = req.params.dAdd;
  Routes.find({
    origin: oAdd,
    destination: dAdd
  }, (err, routes) => {
    if (err) {
      res.statusCode = 400;
      return res.send(err);
    } else {
      res.statusCode = 200;
      return res.send(routes);
    }
  });
};

db.delete = (req, res) => {
  const oAdd = req.param('oAdd');
  const dAdd = req.param('dAdd');
  Routes.remove({
    origin: oAdd,
    destination: dAdd
  }, (err, routes) => {
    if (err) {
      res.statusCode = 400;
      return res.send(err);
    } else {
      res.statusCode = 200;
      return res.send(routes);
    }
  });
};

db.deleteAll = (req, res) => {
  Routes.sync().then(() => {
    Routes.destroy(query);
    Routes.findAll()
      .then(data => {
        const arr = [];
        for (let i = 0; i < data.length; i += 1) {
          arr.push(data[i].dataValues);
        }
        res.json(JSON.stringify(arr));
      });
  });
};

module.exports = db;