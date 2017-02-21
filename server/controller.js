const mongoose = require('mongoose');
const uri = process.env.MONGO_URI || 'mongodb://localhost/trafficJam';
const database = mongoose.connect(uri);

const Routes = require('./model.js');
const db = {};

db.create = (req, res) => {
  Routes.sync().then(() => {
    const data = req.body;
    console.log(data);
    Routes.create({
      origin: data.origin,
      destination: data.destination,
      distance: data.distance,
      liveCommute: data.liveCommute,
      usualCommute: data.usualCommute
    });
  });
};

db.findAll = (req, res) => {
  Routes.sync().then(() => {
    Routes.findAll()
      .then(data => {
        const arr = [];
        for (let i = 0; i < data.length; i += 1) {
          arr.push(data[i].dataValues);
        }
        res.json(JSON.stringify(arr));
      });
  });
}

db.find = (req, res) => {
  const oAdd = req.param('oAdd');
  const dAdd = req.param('dAdd');
  Routes.sync().then(() => {
    const query = {
      where: {
        origin: oAdd,
        destination: dAdd
      }
    }
    Routes.findAll(query)
      .then(data => {
        const arr = [];
        for (let i = 0; i < data.length; i += 1) {
          arr.push(data[i].dataValues);
        }
        res.json(JSON.stringify(arr));
      });
  });
};

db.delete = (req, res) => {
  const oAdd = req.param('oAdd');
  const dAdd = req.param('dAdd');
  Routes.sync().then(() => {
    const query = {
      where: {
        origin: oAdd,
        destination: dAdd
      }
    }
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