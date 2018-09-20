# Price Checker

Simple price checker service which send email if the price drops out for your desired one. Currently it works only for amazon web site. Price checking is carrying out by crawling bot which periodically opens links and grabbing real time price.

## Folder Structure

After creation, your project should look like this:

```
my-app/
  client/
    README.md
    node_modules/
    package.json
    public/
        css/
          creative.css
        img/
          ...
        js/
          creative.js
        scss/
          ...
        vendor/
          ...
        index.html
        favicon.ico
    src/
        ...
        App.css
        App.js
        App.test.js
        index.css
        index.js
        logo.svg
  routes/
    crawlers.js
    users.js
  models/
    crawler.js
    user.js
  helpers/
    crawlersManager.js
  config.js
  server.js

```

`client` folder contains react app was based on [**Create React App**](https://github.com/facebook/create-react-app) package. So it uses Webpack.

`client/public` folder contains design part of app which was based on [**startbootstrap-creative**](https://github.com/BlackrockDigital/startbootstrap-creative) html theme. So `client/public/css`, `client/public/js`, `client/public/scss`, `client/public/vendor` are files from this package. It uses gulp as for bundling manager so gulpfile could be found in `client` folder.

All server side files are located in root. 
`routes` folder contains available API methods. 
`models` folder contains domain models which mapped to MongoDb.
`helpers` folder contains `crawlersManager` which manage crawling process of urls.


## Available Scripts

In the project directory, you can run:

### `npm run client`

It fires npm install for client folder and running npm start. As a result it
runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run server`

Builds and runs server part of app. It available by 
[http://localhost:3001](http://localhost:3001) to view it in the browser or postman.

### `npm run dev`

It runs npm client and npm server simultaneously. **Idially for development purposes** 

## Authentification

To provide basic authentification [Auth0](https://auth0.com/) platform was used. So this covers all logic around security, SSO logins, passwords storage and so on. 

`client/src/Auth` folder has Auth Helper which provides api methods to contact Auth0. It allows to retrieve info about current user, if an user log in, log in and out user. 

Authentification based on 
[JSON Web Tokens](https://en.wikipedia.org/wiki/JSON_Web_Token). Once user authorized auth0 generates token and put it into local storage. This token is used to get access to API methods of backend. 

So frontend should injects `Authorization` property into header every request to API to be indentified by backend and get access.

## Built With

These packeges was used on backend:
* [nodemailer](https://github.com/nodemailer/nodemailer) - to send emails when price drops out to desired one
* [winston](https://github.com/winstonjs/winston) - to log errors and service info
* [concurrently](https://github.com/kimmobrunfeldt/concurrently) - to run server and client simultaneously
* [mongoose](https://mongoosejs.com/) - ODM to execute CRUD operations on model entities of MongoDb
* [needle](https://github.com/tomas/needle) - http client for Node.js with proxy, iconv, cookie, deflate & multipart support.

These packeges was used on frontend:
* [startbootstrap-creative](https://github.com/BlackrockDigital/startbootstrap-creative) - html theme based on twitter bootstrap
* [axios](https://github.com/axios/axios) - for request to backend
* [auth0-js](https://github.com/auth0/auth0.js) - for authentification


## Technical Debt

* move out product as separete entity in db
* introduce controller layer
* call create user only when user sign in
* inject error handler and crash report
* validaton on server side
* form to Json
* avoid jQuery write all to React Bootstrap
* did proper components heerarcy (Crawler -> Model)
* add controller layer in UI 
* factory of diffrent types of price checkers
* fix in IE

## Authors

[**Petr Savchenko**](http://petrsavchenko.ru) - retarded full stack dev from Russia :snowflake:

## License

This project is licensed under the MIT License 