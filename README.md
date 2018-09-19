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

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
