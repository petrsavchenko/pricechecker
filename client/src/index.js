import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Router } from 'react-router-dom';
import App from './App';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Crawlers from './Crawlers/Crawlers';
import Crawler from './Crawler/Crawler';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

const Root = () => {
    return (
      <div>
        <Router history={history}>
          <div>
            <Route path="/" exact render={(props) => <App auth={auth} {...props} />} />

            <Route path="/crawlers" render={(props) => (
              !auth.isAuthenticated() ? (
                <Redirect to="/"/>
              ) : (
                <Crawlers auth={auth} {...props} />
              )
            )} />

            <Route path="/callback" render={(props) => {
              handleAuthentication(props);
              return <Callback {...props} /> 
            }}/>
          </div>
        </Router>
      </div>
    )
  }

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
