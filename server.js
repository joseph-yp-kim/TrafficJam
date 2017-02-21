const express = require('express');
const bodyparser = require('body-parser');
const db = require('./server/controller');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(`${__dirname}/client`));
app.use(bodyparser.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/routes', db.findAll);

app.post('/routes', db.create);

app.get('/api/routes', db.find);

app.delete('/api/routes', db.delete);

app.delete('/routes', db.deleteAll);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on ' + port);
});