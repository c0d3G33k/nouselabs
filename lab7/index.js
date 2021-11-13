const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const path = require('path');
const session = require('express-session');
const methodOverride = require('method-override');
const app = express();
const port = 80;

app.use(express.static('public'));
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
  res.render('index.ejs', { name: req.user.name })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
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
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

app.get('/api/users/:username/details.json', checkAuthenticated,  (req, res) => {

  if(req.params.username != req.user.name) {
    res.status(404).send('Not found!');
  } else {

    res.setHeader('Content-type','application/json');
    res.sendFile(path.resolve('details.json'));
  } 
})

app.get('/statement', checkAuthenticated, (req, res)=> {
   
    let accNo = req.query.acc;
    if(accNo != 12345) {
        res.send('No account found!');
    } else {
        res.render('statement.ejs', { name: req.user.name });
    }
});

app.get('/statement.pdf', checkAuthenticated, (req, res)=> {
    res.sendFile(path.resolve('statement.pdf'));
});

app.get('/feedback', checkAuthenticated, (req, res)=>{
  
    res.render('feedback.ejs', {name: req.user.name});
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

app.listen(port, ()=>{console.log(`Server is running on port: ${port}`)});