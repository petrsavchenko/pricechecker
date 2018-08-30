import React, { Component } from 'react';
import { API_URL } from './../constants';
import axios from 'axios';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = { data: [] };
  }
  
  componentDidMount() {
    this.getCrawlers();
  }

  getCrawlers() {
    let me = this;
    const { getAccessToken, getProfile } = this.props.auth;
    getProfile((err, userProfile) => {
      if (err){
        throw new Error(err);
      }
      const headers = { 'Authorization': `Bearer ${getAccessToken()}`};
      axios.get(`${API_URL}/users/${userProfile.userIdDb}/crawlers`, { headers })
        .then(res => { me.setState({data: res.data}) })
        .catch(err => console.log(err));
    })

  }

  render() {
    return (
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Url</th>
            <th scope="col">Created Date</th>
            <th scope="col">Desired Price</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map((crawler, i) =>
            <tr key={i}>
              <th key={crawler.url} scope="row"><a target="_blank" href={crawler.url}>{crawler.url}</a></th>
              <td key={crawler.createdDate} scope="row">{new Date(crawler.createdDate).toLocaleString()}</td>
              <td key={crawler.desiredPrice} scope="row">${crawler.desiredPrice}</td>
              <td key={crawler.status} scope="row">{crawler.status}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

export default Home;
