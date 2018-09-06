import React, { Component } from 'react';
import { API_URL } from './../constants';
import axios from 'axios';
// import { Link } from "react-router-dom";
// import Nav from '../Nav/Nav';
import Modal from '../Modal/Modal';

  /**
 * Retrieves input data from a form and returns it as a JSON object.
 * @param  {HTMLFormControlsCollection} elements  the form elements
 * @return {Object}                               form data as an object literal
 */
const formToJSON = elements => [].reduce.call(elements, (data, element) => {
  if (element.name)
    data[element.name] = element.value;
  return data;

}, {});

class Crawler extends Component {

  constructor(props) {
    super(props);
    // this.state = { url: '', desiredPrice: ''};
    this.state = { isShowModal: false };
    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { getAccessToken, getProfile } = this.props.auth;

    //let data = new FormData(event.target);
    let data = formToJSON(event.target.elements);
    getProfile((err, userProfile) => {
      if (err){
        throw new Error(err);
      }
      // data.set("creator", userProfile.userIdDb);
      const headers = { 
        'Authorization': `Bearer ${getAccessToken()}`,
        // 'Content-Type': 'multipart/form-data'
      };
      axios.post(`${API_URL}/users/${userProfile.userIdDb}/crawlers`, data, { headers })
        .then(res => { debugger /*me.setState({data: res.data}) */})
        .catch(err => console.log(err));
    })
  }

  toggleModal() {
    this.setState({
      isShowModal: !this.state.isShowModal
    });
  }

  render() {
    const formId = "crowlerForm";
    return (
      <div>
        <button className="btn btn-default btn-primary mb-2" onClick={this.toggleModal}>Add</button>
        {this.state.isShowModal ? 
          <Modal formId={formId} title="Add watch to product" onClose={this.toggleModal}>
            <form id={formId} onSubmit={this.handleSubmit}>
              <div className="form-group">
                  <div className="input-group-lg">
                      <label htmlFor="url">Your product URL</label>
                      <input type="url" name="url" id="url" className="form-control" placeholder="Enter url" required/>
                      <small id="urlHelp" className="form-text text-muted">We'll never share products which you are looking for with anyone else.</small>
                  </div>
              </div>
              <div className="form-group">
                  <div className="input-group input-group-lg">
                      <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroupPrepend">$</span>
                      </div>
                      <input type="number" id="desiredPrice" name="desiredPrice" min="0" className="form-control" placeholder="Desired price" aria-describedby="inputGroupPrepend" required />
                      <div className="invalid-feedback">
                          Please choose a desired price
                      </div>
                  </div>
              </div>
            </form>
          </Modal>        
          : null}
      </div>


        // <form className="form-inline row mb-2" onSubmit={this.handleSubmit}>
        /* <Nav auth={this.props.auth}></Nav>
        <div className="container">
          <form className="col-lg-8 mx-auto">
            <div className="form-group">
              <label htmlFor="productURL">Your product URL</label>
              <input type="url" className="form-control" id="productURL" placeholder="Enter url" required/>
              <small id="urlHelp" className="form-text text-muted">We'll never share products which you are looking for with anyone else.</small>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupPrepend">$</span>
                </div>
                <input type="number" min="0" className="form-control" id="desiredPrice" placeholder="Desired price" aria-describedby="inputGroupPrepend" required />
                <div className="invalid-feedback">
                  Please choose a desired price
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-secondary">Submit</button>
          </form>
        </div> */

      //   <div className="form-group col-sm-8 row">
      //     <label htmlFor="productURL" className="col-sm-3">Your product URL</label>
      //     <input type="url" name="url" className="form-control col-sm-9" id="productURL" placeholder="Enter url" required/>
      //     {/* <small id="urlHelp" className="form-text text-muted">We'll never share products which you are looking for with anyone else.</small> */}
      //   </div>
      //   <div className="form-group col-sm-3">
      //     <div className="input-group">
      //       <div className="input-group-prepend">
      //         <span className="input-group-text" id="inputGroupPrepend">$</span>
      //       </div>
      //       <input type="number" name="desiredPrice" min="0" className="form-control" id="desiredPrice" placeholder="Desired price" aria-describedby="inputGroupPrepend" required />
      //       <div className="invalid-feedback">
      //         Please choose a desired price
      //       </div>
      //     </div>
      //   </div>
      //   <button type="submit" className="btn btn-primary col-sm-1">Add</button>
      // </form>
    );
  }
}

export default Crawler;
