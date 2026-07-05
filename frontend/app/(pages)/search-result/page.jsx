
export default function SearchResult(){
    return(
        <>
      
  <section className="section-pagetop bg">
    <div className="container">
      <h2 className="title-page">Search Result</h2>
    </div>{" "}
    {/* container //  */}
  </section>
  {/* ========================= SECTION INTRO END// ========================= */}
  {/* ========================= SECTION CONTENT ========================= */}
  <section className="section-content padding-y">
    <div className="container">
      <div className="row">
        <aside className="col-md-3">
          <div className="card">
            <article className="filter-group">
              <header className="card-header">
                <a
                  href="#"
                  data-toggle="collapse"
                  data-target="#collapse_1"
                  aria-expanded="true"
                  className=""
                >
                  <i className="icon-control fa fa-chevron-down" />
                  <h6 className="title">Categories</h6>
                </a>
              </header>
              <div
                className="filter-content collapse show"
                id="collapse_1"
                style={{}}
              >
                <div className="card-body">
                  <ul className="list-menu">
                    <li>
                      <a href="#">People</a>
                    </li>
                    <li>
                      <a href="#">Watches </a>
                    </li>
                    <li>
                      <a href="#">Cinema</a>
                    </li>
                    <li>
                      <a href="#">Clothes</a>
                    </li>
                    <li>
                      <a href="#">Home items </a>
                    </li>
                    <li>
                      <a href="#">Animals</a>
                    </li>
                    <li>
                      <a href="#">People </a>
                    </li>
                  </ul>
                </div>{" "}
                {/* card-body.// */}
              </div>
            </article>{" "}
            {/* filter-group  .// */}
            <article className="filter-group">
              <header className="card-header">
                <a
                  href="#"
                  data-toggle="collapse"
                  data-target="#collapse_4"
                  aria-expanded="true"
                  className=""
                >
                  <i className="icon-control fa fa-chevron-down" />
                  <h6 className="title">Sizes </h6>
                </a>
              </header>
              <div
                className="filter-content collapse show"
                id="collapse_4"
                style={{}}
              >
                <div className="card-body">
                  <label className="checkbox-btn">
                    <input type="checkbox" />
                    <span className="btn btn-light"> XS </span>
                  </label>
                  <label className="checkbox-btn">
                    <input type="checkbox" />
                    <span className="btn btn-light"> SM </span>
                  </label>
                  <label className="checkbox-btn">
                    <input type="checkbox" />
                    <span className="btn btn-light"> LG </span>
                  </label>
                  <label className="checkbox-btn">
                    <input type="checkbox" />
                    <span className="btn btn-light"> XXL </span>
                  </label>
                </div>
                {/* card-body.// */}
              </div>
            </article>{" "}
            {/* filter-group .// */}
            <article className="filter-group">
              <header className="card-header">
                <a
                  href="#"
                  data-toggle="collapse"
                  data-target="#collapse_3"
                  aria-expanded="true"
                  className=""
                >
                  <i className="icon-control fa fa-chevron-down" />
                  <h6 className="title">Price range </h6>
                </a>
              </header>
              <div
                className="filter-content collapse show"
                id="collapse_3"
                style={{}}
              >
                <div className="card-body">
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Min</label>
                      {/* <input class="form-control" placeholder="$0" type="number"> */}
                      <select className="mr-2 form-control">
                        <option value={0}>$0</option>
                        <option value={50}>$50</option>
                        <option value={100}>$100</option>
                        <option value={150}>$150</option>
                        <option value={200}>$200</option>
                        <option value={500}>$500</option>
                        <option value={1000}>$1000</option>
                      </select>
                    </div>
                    <div className="form-group text-right col-md-6">
                      <label>Max</label>
                      <select className="mr-2 form-control">
                        <option value={50}>$50</option>
                        <option value={100}>$100</option>
                        <option value={150}>$150</option>
                        <option value={200}>$200</option>
                        <option value={500}>$500</option>
                        <option value={1000}>$1000</option>
                        <option value={2000}>$2000+</option>
                      </select>
                    </div>
                  </div>{" "}
                  {/* form-row.// */}
                  <button className="btn btn-block btn-primary">Apply</button>
                </div>
                {/* card-body.// */}
              </div>
            </article>{" "}
            {/* filter-group .// */}
          </div>{" "}
          {/* card.// */}
        </aside>{" "}
        {/* col.// */}
        <main className="col-md-9">
          <header className="border-bottom mb-4 pb-3">
            <div className="form-inline">
              <span className="mr-md-auto">32 Items found </span>
            </div>
          </header>
          {/* sect-heading */}
          <div className="row">
            <div className="col-md-4">
              <figure className="card card-product-grid">
                <div className="img-wrap">
                  <img src="images/items/1.jpg" />
                </div>{" "}
                {/* img-wrap.// */}
                <figcaption className="info-wrap">
                  <div className="fix-height">
                    <a href="./product-detail.html" className="title">
                      Great item name goes here
                    </a>
                    <div className="price-wrap mt-2">
                      <span className="price">$1280</span>
                      <del className="price-old">$1980</del>
                    </div>{" "}
                    {/* price-wrap.// */}
                  </div>
                  <a href="#" className="btn btn-block btn-success">
                    Added to cart{" "}
                  </a>
                </figcaption>
              </figure>
            </div>{" "}
            {/* col.// */}
            <div className="col-md-4">
              <figure className="card card-product-grid">
                <div className="img-wrap">
                  <img src="images/items/2.jpg" />
                </div>{" "}
                {/* img-wrap.// */}
                <figcaption className="info-wrap">
                  <div className="fix-height">
                    <a href="./product-detail.html" className="title">
                      Product name goes here just for demo item
                    </a>
                    <div className="price-wrap mt-2">
                      <span className="price">$1280</span>
                    </div>{" "}
                    {/* price-wrap.// */}
                  </div>
                  <a href="#" className="btn btn-block btn-primary">
                    Add to cart{" "}
                  </a>
                </figcaption>
              </figure>
            </div>{" "}
            {/* col.// */}
            <div className="col-md-4">
              <figure className="card card-product-grid">
                <div className="img-wrap">
                  <img src="images/items/3.jpg" />
                </div>{" "}
                {/* img-wrap.// */}
                <figcaption className="info-wrap">
                  <div className="fix-height">
                    <a href="./product-detail.html" className="title">
                      Product name goes here just for demo item
                    </a>
                    <div className="price-wrap mt-2">
                      <span className="price">$1280</span>
                    </div>{" "}
                    {/* price-wrap.// */}
                  </div>
                  <a href="#" className="btn btn-block btn-primary">
                    Add to cart{" "}
                  </a>
                </figcaption>
              </figure>
            </div>{" "}
            {/* col.// */}
            <div className="col-md-4">
              <figure className="card card-product-grid">
                <div className="img-wrap">
                  <img src="images/items/4.jpg" />
                </div>{" "}
                {/* img-wrap.// */}
                <figcaption className="info-wrap">
                  <div className="fix-height">
                    <a href="./product-detail.html" className="title">
                      Product name goes here just for demo item
                    </a>
                    <div className="price-wrap mt-2">
                      <span className="price">$1280</span>
                    </div>{" "}
                    {/* price-wrap.// */}
                  </div>
                  <a href="#" className="btn btn-block btn-primary">
                    Add to cart{" "}
                  </a>
                </figcaption>
              </figure>
            </div>{" "}
            {/* col.// */}
            <div className="col-md-4">
              <figure className="card card-product-grid">
                <div className="img-wrap">
                  <img src="images/items/5.jpg" />
                </div>{" "}
                {/* img-wrap.// */}
                <figcaption className="info-wrap">
                  <div className="fix-height">
                    <a href="./product-detail.html" className="title">
                      Product name goes here just for demo item
                    </a>
                    <div className="price-wrap mt-2">
                      <span className="price">$1280</span>
                    </div>{" "}
                    {/* price-wrap.// */}
                  </div>
                  <a href="#" className="btn btn-block btn-primary">
                    Add to cart{" "}
                  </a>
                </figcaption>
              </figure>
            </div>{" "}
            {/* col.// */}
            <div className="col-md-4">
              <figure className="card card-product-grid">
                <div className="img-wrap">
                  <img src="images/items/6.jpg" />
                </div>{" "}
                {/* img-wrap.// */}
                <figcaption className="info-wrap">
                  <div className="fix-height">
                    <a href="./product-detail.html" className="title">
                      Product name goes here just for demo item
                    </a>
                    <div className="price-wrap mt-2">
                      <span className="price">$1280</span>
                    </div>{" "}
                    {/* price-wrap.// */}
                  </div>
                  <a href="#" className="btn btn-block btn-primary">
                    Add to cart{" "}
                  </a>
                </figcaption>
              </figure>
            </div>{" "}
            {/* col.// */}
            <div className="col-md-4">
              <figure className="card card-product-grid">
                <div className="img-wrap">
                  <img src="images/items/7.jpg" />
                </div>{" "}
                {/* img-wrap.// */}
                <figcaption className="info-wrap">
                  <div className="fix-height">
                    <a href="./product-detail.html" className="title">
                      Product name goes here just for demo item
                    </a>
                    <div className="price-wrap mt-2">
                      <span className="price">$1280</span>
                    </div>{" "}
                    {/* price-wrap.// */}
                  </div>
                  <a href="#" className="btn btn-block btn-primary">
                    Add to cart{" "}
                  </a>
                </figcaption>
              </figure>
            </div>{" "}
            {/* col.// */}
            <div className="col-md-4">
              <figure className="card card-product-grid">
                <div className="img-wrap">
                  <img src="images/items/1.jpg" />
                </div>{" "}
                {/* img-wrap.// */}
                <figcaption className="info-wrap">
                  <div className="fix-height">
                    <a href="./product-detail.html" className="title">
                      Product name goes here just for demo item
                    </a>
                    <div className="price-wrap mt-2">
                      <span className="price">$1280</span>
                    </div>{" "}
                    {/* price-wrap.// */}
                  </div>
                  <a href="#" className="btn btn-block btn-primary">
                    Add to cart{" "}
                  </a>
                </figcaption>
              </figure>
            </div>{" "}
            {/* col.// */}
          </div>{" "}
          {/* row end.// */}
          <nav className="mt-4" aria-label="Page navigation sample">
            <ul className="pagination">
              <li className="page-item disabled">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </main>{" "}
        {/* col.// */}
      </div>
    </div>{" "}
    {/* container .//  */}
  </section>
</>

    )
}