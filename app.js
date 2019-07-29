'use strict';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const userHomeRouter = require('./routes/userHome');
const profileRouter = require('./routes/profile');
const modifyProfileRouter = require('./routes/modifyProfile');
const searchResultsRouter = require('./routes/searchResults');
const artistRouter = require('./routes/artist');
const albumRouter = require('./routes/album');
const apiRouter = require('./routes/api');
const playlistRouter = require('./routes/playlistDetails');
const playlistCollectionRouter = require('./routes/playlistCollection');
const playlistSongCollectionRouter = require('./routes/playlistSongCollection');
const app = express();

mongoose.connect('mongodb://localhost/spotypooh', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: 'some-string',
  resave: true,
  httpOnly: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(flash());

app.use((req, res, next) => {
  app.locals.currentUser = req.session.currentUser;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/userHome', userHomeRouter);
app.use('/profile', profileRouter);
app.use('/modifyProfile', modifyProfileRouter);
app.use('/searchResults', searchResultsRouter);
app.use('/artist', artistRouter);
app.use('/album', albumRouter);
app.use('/api', apiRouter);
app.use('/playlistDetails', playlistRouter);
app.use('/playlistCollection', playlistCollectionRouter);
app.use('/playlistSongCollection', playlistSongCollectionRouter);

// -- 404 and error handler

// NOTE: requires a views/not-found.ejs template
app.use((req, res, next) => {
  res.status(404);
  res.render('notFound');
});

// NOTE: requires a views/error.ejs template
app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.render('error');
  }
});

module.exports = app;
