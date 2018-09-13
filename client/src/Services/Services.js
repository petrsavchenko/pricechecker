import React, { Component } from 'react';

class Services extends Component {
  render() {
    return (
        <section id="services">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading">At Your Service</h2>
                <hr className="my-4"/>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 text-center">
                <div className="service-box mt-5 mx-auto">
                  <i className="fa fa-4x fa-bell text-primary mb-3 sr-icons"></i>
                  <h3 className="mb-3">Price Drop Alerts</h3>
                  <p className="text-muted mb-0">Create Amazon price watches and get alerts via email when prices drop.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="service-box mt-5 mx-auto">
                  <i className="fa fa-4x fa-area-chart text-primary mb-3 sr-icons"></i>
                  <h3 className="mb-3">History graphs</h3>
                  <p className="text-muted mb-0">View the price history of over 18 million Amazon products!</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="service-box mt-5 mx-auto">
                  <i className="fa fa-4x fa-bookmark text-primary mb-3 sr-icons"></i>
                  <h3 className="mb-3">Auto booking</h3>
                  <p className="text-muted mb-0">We will book a product for you if price will go down much more then your desired price.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="service-box mt-5 mx-auto">
                  <i className="fa fa-4x fa-usd text-primary mb-3 sr-icons"></i>
                  <h3 className="mb-3">Save up to 80% off</h3>
                  <p className="text-muted mb-0">View products listed by recent price drop!</p>
                </div>
              </div>
            </div>
          </div>
        </section>
    );
  }
}

export default Services;
