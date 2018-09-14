import React, { Component } from 'react';

class Products extends Component {
  render() {
    return (
      <section className="p-0" id="products">
        <div className="container-fluid p-0">
          <div className="row no-gutters popup-gallery">
            <div className="col-lg-4 col-sm-6">
              <a className="portfolio-box" href="img/portfolio/fullsize/1.jpg">
                <img className="img-fluid" src="img/portfolio/thumbnails/1.jpg" alt=""/>
                <div className="portfolio-box-caption">
                  <div className="portfolio-box-caption-content">
                    <div className="project-category text-faded">
                      Benjamin Franklin
                    </div>
                    <div className="project-name">
                      Beware of little expenses; a small leak will sink a great ship
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
                      Proverb
                    </div>
                    <div className="project-name">
                      The art is not in making money, but in keeping it
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
                      Margo Vader
                    </div>
                    <div className="project-name">
                      Small amounts saved daily add up to huge investments in the end
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
                      J. Paul Getty
                    </div>
                    <div className="project-name">
                      If you can count your money, you don't have a billion dollars.
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
                      Warren Buffet
                    </div>
                    <div className="project-name">
                      Do not save what is left after spending, but spend what is left after saving.
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
                      M.K. Soni
                    </div>
                    <div className="project-name">
                      All days are not same. Save for a rainy day. When you don’t work, savings will work for you.
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

export default Products;
