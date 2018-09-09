import React, { Component } from 'react';
import { API_URL } from './../constants';
import axios from 'axios';
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
    this.state = { isShowModal: false };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let me = this;
    const { getAccessToken, getProfile } = this.props.auth;
    //let data = new FormData(event.target);
    let data = formToJSON(event.target.elements);
    getProfile((err, userProfile) => {
      if (err){
        throw new Error(err);
      }
      const headers = { 
        'Authorization': `Bearer ${getAccessToken()}`,
        // 'Content-Type': 'multipart/form-data'
      };
      axios.post(`${API_URL}/users/${userProfile.userIdDb}/crawlers`, data, { headers })
        .then(res => me.props.onAdd(res.data))
        .catch(err => console.log(err));
    })
  }

  toggleModal() {
    this.setState({
      isShowModal: !this.state.isShowModal
    });
  }

  onDelete(event) {
    event.preventDefault();
    let me = this;
    const { getAccessToken, getProfile } = this.props.auth;

    getProfile((err, userProfile) => {
      if (err){
        throw new Error(err);
      }
      const headers = { 
        'Authorization': `Bearer ${getAccessToken()}`,
      };
      axios.delete(`${API_URL}/users/${userProfile.userIdDb}/crawlers/${this.props.selectedCrawlerId}`,
         { headers })
        .then(res => me.props.onDeleteCurrent())
        .catch(err => console.log(err));
    })
  }

  render() {
    const formId = "crowlerForm";
    return (
      <div>
        <button className="btn btn-default btn-primary mb-2" onClick={this.toggleModal}>Add</button>
        {this.props.selectedCrawlerId && 
          <button className="btn btn-default btn-primary ml-2 mb-2" onClick={this.onDelete}>Delete</button>}
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
                  <input type="number" id="desiredPrice" name="desiredPrice" min="1" className="form-control" placeholder="Desired price" aria-describedby="inputGroupPrepend" required />
                  <div className="invalid-feedback">
                      Please choose a desired price
                  </div>
                </div>
              </div>
            </form>
          </Modal>        
          : null}
      </div>
    );
  }
}

export default Crawler;
