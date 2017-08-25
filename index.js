const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');
// const logger = require('morgan');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const cookieSession = require('cookie-session')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const FitbitStrategy = require( 'passport-fitbit-oauth2' ).FitbitOAuth2Strategy;


const app = express();

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

app.get('/auth/fitbit', passport.authenticate('fitbit'));

// app.get('/auth/fitbit/callback', passport.authenticate('fitbit', {
//     successRedirect: '/',
//     failureRedirect: '/login' })
// );

app.get('/auth/fitbit/callback', (req,res)=> {
  res.send('Fitbit callback reached!');
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  // res.sendFile(path.join(__dirname+'/client/build/index.html'));
  console.log('welcome');
});

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
