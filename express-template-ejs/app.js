const express = require('express');
const app = express();
const port = 3000;

const path = require('path');

// Register ejs as .html. If we did
// not call this, we would need to
// name our views foo.ejs instead
// of foo.html. The __express method
// is simply a function that engines
// use to hook into the Express view
// system by default, so if we want
// to change "foo.ejs" to "foo.html"
// we simply pass _any_ function, in this
// case `ejs.__express`.

app.engine('.html', require('ejs').__express);

// Optional since express defaults to CWD/views

app.set('views', path.join(__dirname, 'views'));

// Path to our public directory
// app.use(express.static(path.join(__dirname, 'public')));

// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html');

// Dummy users
var data = {name: 'jhon'};

app.get('/', function (req, res) {
  res.render('index', {
    data: data,
    title: 'Home',
    header: 'Some users',
  });
});

app.get('/about', (req, res) => {
  res.render('pages/about', {
    data: data,
    title: 'About',
    header: 'Some users',
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
