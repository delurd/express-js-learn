const express = require('express');
const app = express();
const port = 3000;

// const serverless = require('serverless-http'); //for netlify
const path = require('path');
const projectDatas = require('./views/data/projects.js');
// import projects from './views/data/projects.js';

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
app.use(express.static(path.join(__dirname, 'public')));

// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html');

// Dummy users
var data = {route: 'home'};

app.get('/', function (req, res) {
  res.render('index', {
    data: {route: 'home', title: 'Home'},
  });
});

app.get('/about', function (req, res) {
  res.render('index', {
    data: {route: 'about', title: 'About'},
  });
});

app.get('/project', function (req, res) {
  res.render('index', {
    data: {route: 'project', title: 'Projects'},
  });
});

app.get('/project/:projectId', function (req, res) {
  const projectId = req.params.projectId;

  if (projectDatas[projectId]) {
    res.render('index', {
      data: {
        route: 'project-detail',
        title: 'Project Detail',
        projectData: projectDatas[projectId],
      },
    });
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// module.exports = serverless(app); //for netlify
module.exports = app; //for vercel
