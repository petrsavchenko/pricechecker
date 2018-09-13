import React, { Component } from 'react';

class Ad extends Component {
  render() {
    return (
      <section className="bg-dark text-white">
        <div className="container text-center">
          <h2 className="mb-4">Start looking after things which you really need!</h2>
          <a className="btn btn-light btn-xl sr-button" href="https://www.amazon.com">Go Amazon</a>
        </div>
      </section>
    );
  }
}

export default Ad;
