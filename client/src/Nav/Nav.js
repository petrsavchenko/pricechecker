import React, { Component } from 'react';

class Nav extends Component {

    componentDidMount() {
        const {isAuthenticated} = this.props.auth;
        let creative = window.creative;
        if(!creative) {
            throw new Error("creavite.js was not loaded");
        }
        creative();
    }

  render() {
    const {isAuthenticated} = this.props.auth;
    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
            <div className="container">
                <a className="navbar-brand js-scroll-trigger" href="#page-top">Price Tracker</a>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {
                    (!isAuthenticated()) ? 
                    (<div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" href="#about">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" href="#services">Services</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" href="#portfolio">Portfolio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" href="#contact">Contact</a>
                        </li>
                        </ul>
                     </div>) : null
                }
                
            </div>
        </nav>
    );
  }
}

export default Nav;
