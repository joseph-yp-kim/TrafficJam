const express = require('express');
const bodyparser = require('body-parser');
const db = require('./server/controller');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(`${__dirname}/client`));
app.use(bodyparser.json());

app.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.render('index');
});

app.get('/routes', db.findAll);

app.post('/routes', db.create);

app.get('/route/:oAdd/:dAdd', db.find);

app.post('/directions', db.directions);

app.delete('/route', db.delete);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on ' + port);
});