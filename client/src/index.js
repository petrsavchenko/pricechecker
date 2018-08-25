import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router } from 'react-router-dom';
import App from './App';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

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
            {/* <Route path="/" component={App}/> */}
            <Route path="/" render={(props) => <App auth={auth} {...props} />} />
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
