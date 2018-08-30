const express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Crowling
const needle = require('needle');
const cheerio = require('cheerio');

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

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file'
}

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

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

const checkScopes = jwtAuthz([ 'read:messages' ]);

app.get('/api/hello', checkJwt, checkScopes, (req, res) => {
  res.send({ express: 'Hello From Express' });
});

// app.get('/api/test', (req, result) => {
//     const URL = 'https://www.amazon.com/Atlin-Tumbler-Double-Stainless-Insulation/dp/B074XMH3W2';
//     let price = 0;

//     needle.get(URL, function(err, res){
//       if (err) throw err;

//       var $ = cheerio.load(res.body);

//       price = $("#priceblock_ourprice").text();
//       // console.log(price);
//       result.send({ price: price });
//     });
// });

app.listen(port, () => console.log(`Listening on port ${port}`));

