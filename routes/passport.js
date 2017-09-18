// const express = require('express');
// const router = express.Router();
// const https = require('https');
// const cors = require('express-cors');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const cookieSession = require('cookie-session');
// const passport = require('passport');
// const FitbitStrategy = require( 'passport-fitbit-oauth2' ).FitbitOAuth2Strategy;
// const knex = require('../knex');
// require('dotenv').config()
//
// let resData;
//
// router.use(cookieParser());
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(cookieSession({
//   secret: 'keyboard cat'
//  }));
//  router.use(cors({
//    allowedOrigins: ["localhost:*", "serene-green.herokuapp.com", "fitbit.com"]
//  }));
//
// router.use(passport.initialize());
// router.use(passport.session());
//
// //passport-fitbit-oauth2 routing
// passport.use(new FitbitStrategy({
//     clientID: process.env.FITBIT_OAUTH2_CLIENT_ID,
//     clientSecret: process.env.FITBIT_OAUTH2_SECRET,
//     callbackURL: "https://serene-green.herokuapp.com/auth/fitbit/callback"
//   },
//   function onSuccessfulLogin(token, refreshToken, profile, done) {
//
//       // This is a great place to find or create a user in the database
//       knex.update({
//       fitbitToken: token,
//       })
//       .into('users')
//       .where('id', 1)
//       //^^replace with 'id', req.cookies.sgUserId,
//       .returning('fitbitToken')
//       .then(data=>{
//         console.log('fitbitToken', data[0]);
//       })
//       // This function happens once after a successful login
//       // // Whatever you pass to `done` gets passed to `serializeUser`
//       done(null, {token, profile});
//     }
//   ));
//
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });
//
// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
// });
//
// router.get('/success', function(req, res, next) {
//   console.log('Successful login!');
//   res.send(req.user);
//   // res.send('Successful login!')
// });
//
// router.get('/failure', function(req, res, next) {
//   res.send(req.user);
//   // res.send('Try again...')
// });
//
// router.get('/',
//   passport.authenticate('fitbit', {scope: ['activity','location','profile']})
// );
//
// router.get('/callback',
//   passport.authenticate('fitbit', {
//     successRedirect: 'auth/fitbit/success',
//     failureRedirect: 'auth/fitbit/failure'
//    }
// ));
//
//
// // catch 404 and forward to error handler
// router.use(function(req, res, next) {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handlers
//
// // development error handler
// // will print stacktrace
// if (router.get('env') === 'development') {
//   router.use(function(err, req, res, next) {
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
// router.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });
// module.exports = router;
