import React, { Component } from 'react';

class Portfolio extends Component {
  render() {
    return (
      <section className="p-0" id="portfolio">
        <div className="container-fluid p-0">
          <div className="row no-gutters popup-gallery">
            <div className="col-lg-4 col-sm-6">
              <a className="portfolio-box" href="img/portfolio/fullsize/1.jpg">
                <img className="img-fluid" src="img/portfolio/thumbnails/1.jpg" alt=""/>
                <div className="portfolio-box-caption">
                  <div className="portfolio-box-caption-content">
                    <div className="project-category text-faded">
                      Category
                    </div>
                    <div className="project-name">
                      Project Name
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-4 col-sm-6">
              <a className="portfolio-box" href="img/portfolio/fullsize/2.jpg">
                <img className="img-fluid" src="img/portfolio/thumbnails/2.jpg" alt=""/>
                <div className="portfolio-box-caption">
                  <div className="portfolio-box-caption-content">
                    <div className="project-category text-faded">
                      Category
                    </div>
                    <div className="project-name">
                      Project Name
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-4 col-sm-6">
              <a className="portfolio-box" href="img/portfolio/fullsize/3.jpg">
                <img className="img-fluid" src="img/portfolio/thumbnails/3.jpg" alt=""/>
                <div className="portfolio-box-caption">
                  <div className="portfolio-box-caption-content">
                    <div className="project-category text-faded">
                      Category
                    </div>
                    <div className="project-name">
                      Project Name
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-4 col-sm-6">
              <a className="portfolio-box" href="img/portfolio/fullsize/4.jpg">
                <img className="img-fluid" src="img/portfolio/thumbnails/4.jpg" alt=""/>
                <div className="portfolio-box-caption">
                  <div className="portfolio-box-caption-content">
                    <div className="project-category text-faded">
                      Category
                    </div>
                    <div className="project-name">
                      Project Name
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-4 col-sm-6">
              <a className="portfolio-box" href="img/portfolio/fullsize/5.jpg">
                <img className="img-fluid" src="img/portfolio/thumbnails/5.jpg" alt=""/>
                <div className="portfolio-box-caption">
                  <div className="portfolio-box-caption-content">
                    <div className="project-category text-faded">
                      Category
                    </div>
                    <div className="project-name">
                      Project Name
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-4 col-sm-6">
              <a className="portfolio-box" href="img/portfolio/fullsize/6.jpg">
                <img className="img-fluid" src="img/portfolio/thumbnails/6.jpg" alt=""/>
                <div className="portfolio-box-caption">
                  <div className="portfolio-box-caption-content">
                    <div className="project-category text-faded">
                      Category
                    </div>
                    <div className="project-name">
                      Project Name
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Portfolio;
