const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session'); // Session
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');

require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});






//-----------------sessions----------------------
server.use(function(req,res,next){
  res.locals.session = req.session;
  next();
});

const SessionStore = require('express-session-sequelize')(expressSession.Store);
const Sequelize = require('sequelize');

const { conn } = require('./db.js');

const sequelizeSessionStore = new SessionStore({
  db: conn,
});

server.use(expressSession(
  {
    name: 'sid',
    secret:'secret', // Debería estar en un archivo de environment
    resave: true,
    store: sequelizeSessionStore,
    saveUninitialized: true,
    cookie:{
      maxAge: 1000 * 60 * 60 * 2 // Está en milisegundos --> 2hs
    }
  }
));

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
