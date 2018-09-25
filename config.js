'use strict'

module.exports = {
    name: 'pricechecker',
    version: '0.0.0.1',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3001,
    db: {
      uri: 'mongodb+srv://pricechecker:gtnh5512+@pricechecker-bsqyh.mongodb.net/pricechecker?retryWrites=true' 
        || 'mongodb://localhost:27017/pricechecker',
    },
    auth: {
      audience: 'https://pricechecker.com',
      domain: 'petrsavchenko.au.auth0.com'
    },
    logDir: 'logs',
    pricecheckingInverval: 60000 //1 minute 
}
