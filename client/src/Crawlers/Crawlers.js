import React, { Component } from 'react';
import { API_URL } from '../constants';
import axios from 'axios';
import Nav from '../Nav/Nav';
import Crawler from '../Crawler/Crawler'

class Crawlers extends Component {
  constructor(props){
    super(props);
    this.state = { data: [], selectedCrawlerId: null };

    this.onAdd = this.onAdd.bind(this);
    this.onDeleteCurrent = this.onDeleteCurrent.bind(this);
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
        .then(res => me.setState({ data: res.data }))
        .catch(err => console.log(err));
    })
  }

  isActive(key) {
    return key === this.state.selectedCrawlerId ? 'active': '';
  }

  onRowClick(key, e) {
    e.preventDefault();
    if (this.state.selectedCrawlerId === key) {
      this.setState({selectedCrawlerId: null});
    } else {
      this.setState({selectedCrawlerId: key});
    }
  }

  onAdd(newCrawler) {
    if(!newCrawler)
      throw new Error("New crawler is empty");

    this.setState(prevState => ({
      data: [...prevState.data, newCrawler]
    }))
  }

  onDeleteCurrent() {
    var selectedCrawlerId = this.state.selectedCrawlerId;
    if(selectedCrawlerId) {
      this.setState({
        data: this.state.data.filter(crawler => crawler._id !== selectedCrawlerId),
        selectedCrawlerId: null
      })
    }
  }

  render() {
    const noSecondsOptions = { 
      year: "numeric", 
      month:"numeric", 
      day:"numeric", 
      hour:"numeric", 
      minute:"numeric"
    };
    return (
      <div>
        <Nav auth={this.props.auth}></Nav>
        <section id="crawlers" className="homehead">
          <div className="container">
            <Crawler 
              auth={this.props.auth} 
              selectedCrawlerId={this.state.selectedCrawlerId}
              onAdd={this.onAdd}
              onDeleteCurrent={this.onDeleteCurrent} 
            />
            <table className="table table-hover text-white">
              <thead>
                <tr>
                  <th scope="col">Url</th>
                  <th scope="col">Created Date</th>
                  <th scope="col">Desired Price</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((crawler, i) =>
                  <tr key={crawler._id} className={this.isActive(crawler._id)} onClick={this.onRowClick.bind(this, crawler._id)}>
                    <td key={crawler.url}><a target="_blank" href={crawler.url}>{crawler.url}</a></td>
                    <td key={crawler.createdDate}>{new Date(crawler.createdDate).toLocaleString([], noSecondsOptions)}</td>
                    <td key={crawler.desiredPrice}>${crawler.desiredPrice}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  }
}

export default Crawlers;
