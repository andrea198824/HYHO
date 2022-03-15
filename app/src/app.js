const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session'); // Session
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');

require('./db.js');

const server = express();
const cors= require('cors');

server.name = 'API';

server.use(cors())
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});






//-----------------sessions----------------------
// server.use(function(req,res,next){
//   res.locals.session = req.session;
//   next();
// });

// const SessionStore = require('express-session-sequelize')(expressSession.Store);
// const Sequelize = require('sequelize');

// const { conn } = require('./db.js');

// const sequelizeSessionStore = new SessionStore({
//   db: conn,
// });

// server.use(expressSession(
//   {
//     name: 'sid',
//     secret:'secret', // Debería estar en un archivo de environment
//     resave: true,
//     store: sequelizeSessionStore,
//     saveUninitialized: true,
//     cookie:{
//       maxAge: 1000 * 60 * 60 * 2 // Está en milisegundos --> 2hs
//     }
//   }
//   ));
  // -----------------sessions----------------------
  
  //-----------------auth0----------------------
  const { auth } = require('express-openid-connect');

  const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3001',
    clientID: 'MdbJSOTKpRdZE7FfCVXVaYmnqHnWrHRi',
    issuerBaseURL: 'https://dev-9xm6ldt3.us.auth0.com'
  };

// auth router attaches /login, /logout, and /callback routes to the baseURL
  server.use(auth(config));

  server.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
  });
  //-----------------auth0----------------------
  
  
  server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
