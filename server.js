const express = require('express');
// const https = require('https');
// const fs = require('fs');
// const HTTPS_PORT = 3443;
const app = express();
// const secureServer = https.createServer({
//   key: fs.readFileSync('https-keys/private.key'),
//   cert: fs.readFileSync('https-keys/certificate.pem')
// }, app)
// .listen(HTTPS_PORT, function () {
//   console.log('Secure Server listening on port ' + HTTPS_PORT);
// });

require('dotenv').config();
const path = require('path');
const cors = require('express-cors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const knex = require('./knex');
const bcrypt = require ('bcrypt');
const saltRounds = 10;
// const jwt = require('jsonwebtoken');
const passport = require('./routes/passport.js')
app.use(cors({
  allowedOrigins: ["localhost:*", "serene-green.herokuapp.com", "fitbit.com"]
}));

// app.all('*', function(req, res, next){
//   if (req.secure) {
//     return next();
//   };
//   res.redirect(`https://${req.hostname}:${HTTPS_PORT}${req.url}`);
// });
app.use('/auth/fitbit', passport);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client/build')));

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

app.get('/categories', (req,res,next)=>{
  knex('categories')
  .select('*')
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    console.log('error');
    next(err);
  });
})

app.post('/places', (req,res,next)=>{
  let body = req.body;
  console.log(body);
  let addPlaces = {
    description: body.title,
    user_id: 1,
    //^^replace with user_id: req.cookies.sgUserId,
    lat: body.lat,
    lng: body.lng,
    visits_this_month: 1
  };

  let catId;
  body.categories.forEach(catObj=>{
    if (body.category === catObj.category) return catId = catObj.id;
  })
  knex.insert(addPlaces)
  .into('places')
  .returning('*')
  .then(response => {
    let addPlaceCategory = {
      place_id: response[0].id,
      category_id: catId
    }
    knex.insert(addPlaceCategory)
    .into('place-category')
    .then(throwaway=>{
      response[0].url = '/mapplaces'
      res.send(response[0]);
    })
    .catch(err => {
      console.log('error in post /place-category', err);
      next(err);
    });
  })
  .catch(err => {
    console.log('error in post /places', err);
    next(err);
  });

  // console.log(req.cookies);
  // jwt.verify(req.cookies.token, process.env.JWT_KEY, function (err,decoded) {
  //   if (err) {
  //     res.clearCookie('token');
  //     console.log('token cleared');
  //     return next(err);
  //   }
  //   req.user = decoded;
  //   console.log('JWT verified!');
  // });

  // knex.insert(body)
  // .into('places')
  // .returning('*')
  // .then(response => {
  //   res.send(`${response[0]} added!`);
  // })
  // .catch(err => {
  //   console.log('error in post /places');
  //   next(err);
  // });
})

app.get('/fitness', (req, res, next)=>{
  let fitness = {
    username: 'Shotgun',
    currentSteps: 8756,
    currentGoal: 12500
  }
  res.send(fitness)
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
      delete response[0].hashed_password;
      let user = {
        id: response[0].id,
        username: response[0].username,
        score: response[0].score,
        submissions_remaining: response[0].submissions_remaining
      };
      // var token = jwt.sign(user, process.env.JWT_KEY);
      // res.cookie('token', token, {httpOnly: true});
      console.log(`${response[0].username} signed up!`);
      response[0].url = '/mapplaces'
      return res.send(response[0]);
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
      // let tokenUser = data[0];
      // jwt.sign(tokenUser, process.env.JWT_KEY, (err, token)=>{
      //   if(err) {
      //     console.log('err');
      //     return next(err);
      //   }
      //   console.log('token', token);
      //   res.cookie('token', token, {httpOnly: true});
      //   console.log(res.cookies);
      // });
      let sgUserId = data[0].id
      res.cookie('sgUserId', sgUserId, {httpOnly: true});
      delete data[0].hashed_password;
      data[0].url = '/mapplaces';
      console.log(`${data[0].username} logged in.`);
      return res.send(data[0]);
    } else {
      res.setHeader('content-type', 'text/plain');
      return res.status(400).send('Bad username or password');
    }
  })
  .catch(function (err) {
      return next(err);
    });
});

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

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
  .send(err);
});
