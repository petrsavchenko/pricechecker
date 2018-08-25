import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    response: ''
  };

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const { getAccessToken } = this.props.auth;
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
    const response = await fetch('/api/hello', { headers: headers});
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        <header className="masthead text-center text-white d-flex">
          <div className="container my-auto">
            <div className="row mx-auto">
              <div className="col-lg-12 mx-auto">
                {
                  (isAuthenticated()) ? ( <button className="btn btn-danger log" onClick={this.logout.bind(this)}>Log out </button> ) : ( <button className="btn btn-info log" onClick={this.login.bind(this)}>Log In</button> )
                }
                <h1 className="text-uppercase mb-4">
                    <strong>Amazon price tracker</strong>
                </h1>
                <input placeholder="Enter Amazon URL" className="form-control form-control-lg" required type="url"/>
                <hr/>
              </div>
              <div className="col-lg-8 mx-auto">
                <p className="text-faded mb-5">Just create Amazon price watches and get alerts via email when prices drop</p>
                <a className="btn btn-primary btn-xl js-scroll-trigger" href="#about">Watch it</a>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
