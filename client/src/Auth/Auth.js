import auth0 from 'auth0-js';
import axios from 'axios';
import { AUTH_CONFIG } from './auth0-variables';
import history from '../history';
import { API_URL, AUTH_SUCCESSFUL_REDIRECT } from '../constants';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: AUTH_CONFIG.apiUrl,
    responseType: 'token id_token',
    scope: 'openid profile read:messages'
  });

  userProfile;

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace(AUTH_SUCCESSFUL_REDIRECT);
      } else if (err) {
        history.replace(AUTH_SUCCESSFUL_REDIRECT);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    
    // navigate to the home route
    history.replace(AUTH_SUCCESSFUL_REDIRECT);
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getProfile(cb) {
    if (this.userProfile) {
      cb(null, this.userProfile);
    }
    let accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (err) {
        cb(err, null);
      }
      this.assosiateDbUser(profile, cb);
    });
  }

  assosiateDbUser(profile, cb) {
    let me = this;
    const headers = { 'Authorization': `Bearer ${this.getAccessToken()}`};
    axios.get(`${API_URL}/users`, { params: {email: profile.email} }, { headers })
      .then(res => {
          if(res.data._id) {
            this.setUserProfile(profile, res.data._id);
            cb(null, this.userProfile);
          } else {
              var data = { 
                email: profile.email,
                name: { first: profile.nickname, last: profile.nickname }
              };
              axios.post(`${API_URL}/users`, data, { headers })
                .then(res => {
                  this.setUserProfile(profile, res.data.id);
                  cb(null, this.userProfile);
                })
                .catch(err => cb(err, null));
          }
      }).catch(err => cb(err, null));  
  }

  setUserProfile(profile, userIdDb) {
    if (this.userProfile) {
      throw new Error('user profile already exists');
    }
    this.userProfile = profile;
    this.userProfile.userIdDb = userIdDb;
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.userProfile = null;
    // navigate to the home route
    history.replace(AUTH_SUCCESSFUL_REDIRECT);
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
