import React, { Component } from 'react';
// import logo from './logo.svg';
import About from './About/About';
import Services from './Services/Services';
import Portfolio from './Portfolio/Portfolio';
import Ad from './Ad/Ad';
import Contact from './Contact/Contact';
import Nav from './Nav/Nav';
import Title from './Title/Title';
import './App.css';



class App extends Component {
  render() {
    return (
      <div>

        <Nav auth={this.props.auth}/>

        <Title auth={this.props.auth}/>
        
        <About/>

        <Services/>

        <Portfolio/>

        <Ad/>

        <Contact/>  

      </div>
    );
  }
}

export default App;
