const express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Authentification
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// Routes
var users = require('./routes/users');
var crawlers = require('./routes/crawlers');

const app = express();
const port = process.env.PORT || 3001;

// if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
//   throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file'
// }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());
app.use(morgan('API Request (port 3001): :method :url :status :response-time ms - :res[content-length]'));

app.use(users);
app.use(crawlers);

// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb://localhost:27017/pricechecker'
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



// const checkJwt = jwt({
//   // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
//   }),
//   // Validate the audience and the issuer.
//   audience: process.env.AUTH0_AUDIENCE,
//   issuer: `https://${process.env.AUTH0_DOMAIN}/`,
//   algorithms: ['RS256']
// });

// const checkScopes = jwtAuthz([ 'read:messages' ]);

// app.get('/api/hello', checkJwt, checkScopes, (req, res) => {
//   res.send({ express: 'Hello From Express' });
// });

//not to cancel dependent thread tasks
// process.on('uncaughtException', err => console.log(err));

const winston = require('winston');
const fs = require('fs');
const env = process.env.NODE_ENV || 'development';
const logDir = 'log';
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const tsFormat = () => (new Date()).toLocaleTimeString();

winston.add(new (require('winston-daily-rotate-file'))({
  filename: `${logDir}/log`,
  timestamp: tsFormat,
  datePattern: 'D-M-Y',
  prepend: true,
  json: false,
  level: env === 'development' ? 'verbose' : 'info',
}));

//
// You can add a separate exception logger by passing it to `.exceptions.handle`
//
winston.exceptions.handle(
  new winston.transports.File({ filename: `${logDir}/exceptions.log` })
);

winston.exitOnError = false;

//Start crawling
var crawlersManager = require('./crawlers/crawlersManager');
crawlersManager.startAll();

app.listen(port, () => console.log(`Listening on port ${port}`));

