const express = require('express');
const router = express.Router();
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const FitbitStrategy = require( 'passport-fitbit-oauth2' ).FitbitOAuth2Strategy;
const knex = require('../knex');
require('dotenv').config()

router.use(cookieParser());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(session({
  secret: process.env.PASSPORT_SECRET,
  resave: false,
  saveUninitialized: true
 }));

router.use(passport.initialize());
router.use(passport.session());

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));


//passport-fitbit-oauth2 routing
passport.use(new FitbitStrategy({
    clientID: process.env.FITBIT_OAUTH2_CLIENT_ID,
    clientSecret: process.env.FITBIT_OAUTH2_SECRET,
    callbackURL: "http://serene-green.herokuapp.com/auth/fitbit/callback"
    // callbackURL: "http://localhost:5000/auth/fitbit/callback"
  },
  function onSuccessfulLogin(token, refreshToken, profile, done) {

      // This is a great place to find or create a user in the database
      knex.update({
      fitbitToken: token,
      })
      .into('users')
      .where('id', 1)
      .returning('fitbitToken')
      .then(data=>{
        console.log(data);
      })
      // This function happens once after a successful login

      // Whatever you pass to `done` gets passed to `serializeUser`
      console.log(token);
      done(null, {token, profile});
    }
  ));

passport.serializeUser(function(user, done) {
  // console.log('serializeUser', user);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  // console.log('deserializeUser', obj);
  done(null, obj);
});

router.get('/success', function(req, res, next) {
  // res.send(req.user);
  res.send('Successful login!')
});

router.get('/failure', function(req, res, next) {
  // res.send(req.user);
  res.send('Try again...')
});


router.get('/',
  passport.authenticate('fitbit', {scope: ['activity','heartrate','location','profile']}
));

router.get('/callback',
  passport.authenticate('fitbit', {
    successRedirect: '/success',
    failureRedirect: '/failure'
   }
));


// catch 404 and forward to error handler
router.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (router.get('env') === 'development') {
  router.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
router.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
module.exports = router;
