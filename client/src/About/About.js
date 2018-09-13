import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
        <section className="bg-primary" id="about">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 mx-auto text-center">
                    <h2 className="section-heading text-white">We've got what you need!</h2>
                    <hr className="light my-4"/>
                    <p className="text-faded mb-4">Our free Amazon price tracker monitors millions of products and alerts you when prices drop, helping you buy item at minimum price.</p>
                    <a className="btn btn-light btn-xl js-scroll-trigger" href="#services">Get Started!</a>
                    </div>
                </div>
            </div>
        </section>
    );
  }
}

export default About;
