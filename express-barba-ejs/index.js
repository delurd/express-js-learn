const express = require('express');

const app = express();
const port = 3000;
const path = require('path');

const userData = {
  1: {name: 'Doe'},
  2: {name: 'Jhon'},
};

//to use .html format instead of .ejs
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.render('index', {route: 'home', data: {title: 'Home'}});
});

app.get('/about', (req, res) => {
  res.render('index', {route: 'about'});
});

app.get('/users', (req, res) => {
  res.render('index', {route: 'users'});
});

app.get('/users/:userId', (req, res) => {
  const _userId = req.params.userId;

  if (userData[_userId]) {
    res.render('index', {route: 'user-detail', data: userData[_userId]});
  } else {
    res.render('index', {route: 'not-found'});
    // res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
