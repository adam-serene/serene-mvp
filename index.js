const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const FitbitStrategy = require( 'passport-fitbit-oauth2' ).FitbitOAuth2Strategy;
const app = express();
const cors = require('cors');
require('dotenv').config()

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.PASSPORT_SECRET,
  resave: false,
  saveUninitialized: true
 }));

app.use(passport.initialize());
app.use(passport.session());

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));


//passport-fitbit-oauth2 routing
passport.use(new FitbitStrategy({
    clientID: process.env.FITBIT_OAUTH2_CLIENT_ID,
    clientSecret: process.env.FITBIT_OAUTH2_SECRET,
    callbackURL: "https://serene-green.herokuapp.com/auth/fitbit/callback"
    // callbackURL: "http://localhost:5000/auth/fitbit/callback"
  },
  function onSuccessfulLogin(token, refreshToken, profile, done) {

      // This is a great place to find or create a user in the database
      // This function happens once after a successful login

      // Whatever you pass to `done` gets passed to `serializeUser`
      console.log(profile.displayName);
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

app.get('/auth/fitbit/success', function(req, res, next) {
  // res.send(req.user);
  res.send('Successful login!')
});

app.get('/auth/fitbit/failure', function(req, res, next) {
  // res.send(req.user);
  res.send('Try again...')
});


app.get('/auth/fitbit',
  passport.authenticate('fitbit', {scope: ['activity','heartrate','location','profile']}
));

app.get('/auth/fitbit/callback',
  passport.authenticate('fitbit', {
    successRedirect: '/auth/fitbit/success',
    failureRedirect: '/auth/fitbit/failure'
   }
));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//   console.log('catchall');
//   // res.sendFile(path.join(__dirname+'/client/build/index.html'));
//   res.send('welcome');
// });

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
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }
//
// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });
