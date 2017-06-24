const mongoose = require('mongoose');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
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
  console.log('parameters:', req.params);
  const oAdd = req.params.oAdd;
  const dAdd = req.params.dAdd;
  console.log('oAdd:', oAdd);
  console.log('dAdd:', dAdd);
  Routes.find({
    origin: oAdd,
    destination: dAdd
  }, (err, routes) => {
    if (err) {
      res.statusCode = 400;
      return res.send(err);
    } else {
      console.log(routes);
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

db.directions = (req, res) => {
  const url = req.body.url;
  const xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }
  xhr.onload = function() {
    const response = xhr.responseText;
    // console.log(response);
    res.json(response);
  };
  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };
  xhr.send();
};

function createCORSRequest(method, url) {
  const xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

module.exports = db;