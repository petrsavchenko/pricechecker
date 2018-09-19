'use strict'

module.exports = {
    name: 'pricechecker',
    version: '0.0.0.1',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3001,
    db: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/pricechecker',
    },
    logDir: 'logs',
    pricecheckingInverval: 600000 //10 minutes
}
