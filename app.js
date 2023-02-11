const express = require('express');
const mongodb = require('./db/connect');

const session = require('express-session')
const passport = require('passport')
const mongoose = require('mongoose');


const GoogleStrategy = require('passport-google-oauth2').Strategy;

const port = process.env.PORT || 3000;
const app = express();

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))  
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

app.use(session({
  secret: "secret",
  resave: false ,
  saveUninitialized: true ,
}))

app.use(passport.initialize())
app.use(passport.session())

const GOOGLE_CLIENT_ID = 
"732990247633-fahqqhu6io1otpap2efa848tp2ie9007.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET="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"

authUser = (request, accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/callback",
    passReqToCallback   : true
  }, authUser));

  passport.serializeUser( (user, done) => {
    done(null, user)
 })
 // The "user" is the authenticated user object, that is passed from the authUser() function in "Google Strategy".
 // This "user" object is attached to "req.session.passport.user.{user}"

 passport.deserializeUser((user, done) => {
   done (null, user)
 })
 // The "user" is the authenticated user object, that was attached 
//to "req.session.passport.user.{user}" in the passport.serializeUser() function.

//Start the NODE JS server
app.listen(3001, () => console.log(`Server started on port 3001...`))


//console.log() values of "req.session" and "req.user" so we can see what is happening during Google Authentication
let count = 1
showlogs = (req, res, next) => {
    console.log("\n==============================")
    console.log(`------------>  ${count++}`)

    console.log(`\n req.session.passport -------> `)
    console.log(req.session.passport)
  
    console.log(`\n req.user -------> `) 
    console.log(req.user) 
  
    console.log("\n Session and Cookie")
    console.log(`req.session.id -------> ${req.session.id}`) 
    console.log(`req.session.cookie -------> `) 
    console.log(req.session.cookie) 
  
    console.log("===========================================\n")

    next()
}

app.use(showlogs)

app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ]
}));
app.get('/auth/google/callback', passport.authenticate( 'google', {
   successRedirect: '/dashboard',
   failureRedirect: '/login'
}));

app.get("/login", (req, res) => {
  res.end({login})
})

checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next() }
  res.redirect("/login")
}
app.get("/dashboard", checkAuthenticated, (req, res) => {
 // res.render("dashboard.ejs", {name: req.user.displayName})
  res.end({login})

})

app.post("/logout", (req,res) => {
  req.logOut()
  res.redirect("/login")
  console.log(`-------> User Logged out`)
})