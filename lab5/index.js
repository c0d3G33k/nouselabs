const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const app = express();
const port = 80;

app.use(express.urlencoded({ extended: false}));
app.use(flash());
app.use(session({
    secret: 'xss',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

const users = [

]

const initializePassport = require('./passport-config');


initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);

app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name });
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs');
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs');
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login');
  } catch {
    res.redirect('/register');
  }
})

app.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next();
}

app.get('/saving', checkAuthenticated, (req, res) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.render('saving.ejs', { name: req.user.name });
})

app.get('/fixed', checkAuthenticated, (req, res) => {

  let originHeader = req.header('Origin');

  if(originHeader) {

    res.setHeader('Access-Control-Allow-Origin', originHeader);
    res.setHeader('Access-Control-Allow-Credentials','true');
    res.render('fixed.ejs', { name: req.user.name });
  } else {
    res.setHeader('Access-Control-Allow-Credentials','true');
    res.render('fixed.ejs', { name: req.user.name });
  }
  
})

app.get('/recuring', checkAuthenticated, (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials','true');
  res.render('recuring.ejs', { name: req.user.name });
})

app.get('/address', checkAuthenticated, (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*.lab.com');
  res.setHeader('Access-Control-Allow-Credentials','true');
  res.render('address.ejs', { name: req.user.name });
})

app.get('/recovery', (req, res)=> {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.render('recovery.ejs');
});

app.listen(port, ()=>{console.log(`Server is running on port: ${port}`)});