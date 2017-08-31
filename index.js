const express = require('express');
const app = express();

// app.get('*', (req,res,next)=>{
//   res.redirect('http://serene.green/');
// });

require('dotenv').config();
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const knex = require('./knex');
const bcrypt = require ('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const passport = require('./routes/passport')
app.use('/auth/fitbit', passport);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/users', (req, res, next)=>{
  knex('users')
  .select('users.id', 'users.fitbitToken')
  .then(result => {
  res.send(result);
  })
  .catch(err => {
    next(err);
  });
})

app.post('/register', (req,res,next)=>{
  let body = req.body;

  bcrypt.hash(body.password, saltRounds, (err, hash)=>{
    knex.insert({
      username: body.username,
      full_name: body.full_name,
      email: body.email,
      birthday: body.birthday,
      hashed_password: hash,
    })
    .into('users')
    .returning('*')
    .then((response)=>{
      delete response.hashed_password;
      res.send(response[0]);
    });
  });
});

app.post('/login', (req,res,next) => {
  let username = req.body.username;
  let password = req.body.password;

  knex('users')
  .select('id', 'username', 'hashed_password', 'score', 'submissions_remaining')
  .where('username', username)
  .then((data) => {
    if(data.length === 0){
      res.setHeader('content-type', 'text/plain');
      return res.status(400).send('Bad username or password');
    } else if (bcrypt.compareSync(password, data[0].hashed_password)){
      let user = {
        id: data[0].id,
        username: data[0].username,
        score: data[0].score,
        submissions_remaining: data[0].submissions_remaining
      };
      var token = jwt.sign(user, process.env.JWT_KEY);
      res.cookie('token', token, {httpOnly: true});
      return res.sendStatus(200);
    } else {
      res.setHeader('content-type', 'text/plain');
      return res.status(400).send('Bad username or password');
    }
  });
});

app.get('/', (req,res,next)=>{
  jwt.verify(req.cookies.token, process.env.JWT_KEY, function (err,decoded) {
    if (err) {
      res.clearCookie('token');
      return next(err);
    }
    req.user = decoded;
    res.send(req.user);
  });
});

app.use(function (req,res,next) {
  if (req.cookies.token) {
    jwt.verify(req.cookies.token, process.env.JWT_KEY, function (err,decoded) {
      if (err) {
        res.clearCookie('token');
        return next(err);
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.redirect('/login');
  }
});

app.use(express.static(path.join(__dirname, 'client/build')));

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Listening on ${port}`);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
