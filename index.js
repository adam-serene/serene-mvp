const express = require('express');
  //  env = process.env.NODE_ENV || 'development';
const app = express();
// const forceSsl = function (req, res, next) {
//   if (req.headers['x-forwarded-proto'] !== 'https') {
//     return res.redirect(['https://', req.get('Host'), req.url].join(''));
//   }
//   return next();
// };
// app.configure(function () {
//   if (env === 'production') {
//     app.use(forceSsl);
//   }
// };

require('dotenv').config();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const knex = require('./knex');
const bcrypt = require ('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const passport = require('./routes/passport')
app.use('/auth/fitbit', passport);
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/places', (req, res, next)=>{
  knex('places')
  .select('*')
  .then(data => {
    let result = [...data];
    data.map((place, index) =>{
      result[index].position = {};
      result[index].position.lat = place.lat;
      (place.lng) ? result[index].position.lng = place.lng : result[index].position.lng = place.long;
    })
    res.send(result);
  })
  .catch(err => {
    console.log('error');
    next(err);
  });
})

app.post('/places', (req, res, next)=>{
  let body = req.body;
  knex.insert(body)
  .into('places')
  .returning('*')
  .then(response => {
    res.send(`${response[0]} added!`);
  })
  .catch(err => {
    console.log('error');
    next(err);
  });
})

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
      console.log(`${response[0].username} signed up!`);
      return res.redirect('https://serene-green.herokuapp.com/mapplaces');
    })
    .catch(function (err) {
      return next(err);
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
      console.log(`${data[0].username} logged in.`);
      return res.redirect('https://serene-green.herokuapp.com/mapplaces');
    } else {
      res.setHeader('content-type', 'text/plain');
      return res.status(400).send('Bad username or password');
    }
  })
  .catch(function (err) {
      return next(err);
    });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// app.get('/', (req,res,next)=>{
//   jwt.verify(req.cookies.token, process.env.JWT_KEY, function (err,decoded) {
//     if (err) {
//       res.clearCookie('token');
//       return next(err);
//     }
//     req.user = decoded;
//     res.sendFile(path.join(__dirname+'/client/build/index.html'));
//   });
// });

// app.use(function (req,res,next) {
//   if (req.cookies.token) {
//     jwt.verify(req.cookies.token, process.env.JWT_KEY, function (err,decoded) {
//       if (err) {
//         res.clearCookie('token');
//         return next(err);
//       }
//       req.user = decoded;
//       console.log('token good');
//       next();
//     });
//   } else {
//     return res.redirect('https://serene-green.herokuapp.com/login');
//     // return res.send('invalid login');
//
//   }
// });


const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Listening on ${port}`);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('404 error', err);
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  .send(err.constraint);
});
