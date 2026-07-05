import axios from 'axios';
import Link from "next/link";


export default async function Header(){
  let products = [];
  let error = null;
     
  try{
        const  response = await axios.get(`http://127.0.0.1:8000/category`);
        products = (response.data);
        
      }catch(err){
            error = ({status: err.response?.status || "Network Error", message: err.response?.data?.message || err.message || "Unknown error"})

    }
    return(
        <header className="section-header">
  <nav className="navbar p-md-0 navbar-expand-sm navbar-light border-bottom">
    <div className="container">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTop4"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarTop4">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item dropdown">
            <a href="#" className="nav-link">
              {" "}
              English{" "}
            </a>
          </li>
          <li className="nav-item dropdown">
            <a href="#" className="nav-link">
              {" "}
              USD{" "}
            </a>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li>
            <a href="#" className="nav-link">
              {" "}
              <i className="fa fa-envelope" /> Email{" "}
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              {" "}
              <i className="fa fa-phone" /> Call us{" "}
            </a>
          </li>
        </ul>{" "}
        {/* list-inline //  */}
      </div>{" "}
      {/* navbar-collapse .// */}
    </div>{" "}
    {/* container //  */}
  </nav>
  <section className="header-main border-bottom">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-2 col-md-3 col-6">
          <a href="./" className="brand-wrap">
            <img className="logo" src="/./images/logo.png" />
          </a>{" "}
          {/* brand-wrap.// */}
        </div>
        <div className="col-lg col-sm col-md col-6 flex-grow-0">
          <div className="category-wrap dropdown d-inline-block float-right">
            <button
              type="button"
              className="btn btn-primary dropdown-toggle"
              data-toggle="dropdown"
            >
              <i className="fa fa-bars" /> All category
            </button>
            <div className="dropdown-menu">
              {products.length > 0 && (
                  products.map((product) => (
              
                <Link className="dropdown-item" href={`/${product.SLug}`} key={product.id}>
                {product.Cate_Name}
                </Link>
             
              
                ))
              )}
              
            </div>
          </div>{" "}
          {/* category-wrap.// */}
        </div>{" "}
        {/* col.// */}
        <Link href="/store" className="btn btn-outline-primary">
          Store
        </Link>
        
        <div className="col-lg  col-md-6 col-sm-12 col">
          <form action="#" className="search">
            <div className="input-group w-100">
              <input
                type="text"
                className="form-control"
                style={{ width: "60%" }}
                placeholder="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="submit">
                  <i className="fa fa-search" />
                </button>
              </div>
            </div>
          </form>{" "}
          {/* search-wrap .end// */}
        </div>{" "}
        {/* col.// */}
        <div className="col-lg-3 col-sm-6 col-8 order-2 order-lg-3">
          <div className="d-flex justify-content-end mb-3 mb-lg-0">
            <div className="widget-header">
              <small className="title text-muted">Welcome guest!</small>
              <div>
                <a href="./signin.html">Sign in</a>{" "}
                <span className="dark-transp"> | </span>
                <a href="./register.html"> Register</a>
              </div>
            </div>
            <a href="./cart.html" className="widget-header pl-3 ml-3">
              <div className="icon icon-sm rounded-circle border">
                <i className="fa fa-shopping-cart" />
              </div>
              <span className="badge badge-pill badge-danger notify">0</span>
            </a>
          </div>{" "}
          {/* widgets-wrap.// */}
        </div>{" "}
        {/* col.// */}
      </div>{" "}
      {/* row.// */}
    </div>{" "}
    {/* container.// */}
  </section>{" "}
  {/* header-main .// */}
</header>

    )
}