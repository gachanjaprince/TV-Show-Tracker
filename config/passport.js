const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {


    // User.findOne({ email: email.toLowerCase() }, (err, user) => {
    //   if (err) { return done(err) }
    //   if (!user) {
    //     return done(null, false, { msg: `Email ${email} not found.` })
    //   }
    //   if (!user.password) {
    //     return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' })
    //   }
    //   user.comparePassword(password, (err, isMatch) => {
    //     if (err) { return done(err) }
    //     if (isMatch) {
    //       return done(null, user)
    //     }
    //     return done(null, false, { msg: 'Invalid email or password.' })
    //   })
    // })

    User.findOne({ email: email.toLowerCase() })
        .then((data)=> {
          if (!data) {
            return done(null, false, { msg: `Email ${email} not found.` })
          }
          if (!data.password) {
            return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' })
          }
          data.comparePassword(password, (err, isMatch) => {
            if (err) { return done(err) }
            if (isMatch) {
              return done(null, data)
            }
            return done(null, false, { msg: 'Invalid email or password.' })
          })
        })
        .catch((err) => next(err));
  }))
  

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser( async (id, done) => {
    User.findById(id)
        .then (user=> done(null, user))
        .catch(err => done(err, null))
  })

  // passport.deserializeUser((id, done) => {
  //   User.findById(id, (err, user) => done(err, user))
  // })
}
