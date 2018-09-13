import React, { Component } from 'react';

class Title extends Component {

  constructor(props) {
    super(props);
    this.state = {url: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({url: event.target.value});
  }


  watchIt() {
    const {isAuthenticated, login, setLandingPageUrl} = this.props.auth;
    if(!isAuthenticated()) {
      const landingPageUrl = this.state.url;
      if(landingPageUrl)
        setLandingPageUrl(landingPageUrl);
      login();
    }
  }

  render() {
    return (
        <header className="masthead text-center text-white d-flex">
          <div className="container my-auto">
            <div className="row mx-auto">
              <div className="col-lg-12 mx-auto">               
                <h1 className="text-uppercase mb-4">
                  <strong>Amazon price tracker</strong>
                </h1>
                <input placeholder="Enter Amazon URL" className="form-control form-control-lg" required type="url" onChange={this.handleChange}/>
                <hr/>
              </div>
              <div className="col-lg-8 mx-auto">
                <p className="text-faded mb-5">Just create Amazon price watches and get alerts via email when prices drop</p>
                <a className="btn btn-primary btn-xl" onClick={this.watchIt.bind(this)}>Watch it</a>
              </div>
            </div>
          </div>
        </header>
    );
  }
}

export default Title;
