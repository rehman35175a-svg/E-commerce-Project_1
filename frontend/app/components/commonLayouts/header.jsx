import api from "@/lib/axios";
import Link from "next/link";
import SearchBar from "./SearchBar";
import CartCounter from "./CartCounter";
import LogoutButton from "./LogoutButton"; 
import { cookies } from "next/headers";

export default async function Header() {
  let products = [];
  let error = null;
  let cartCount = 0;
  let user = null;

  // ---------- CATEGORY FETCH ----------
  try {
    const response = await api.get(`/category/`);
    products = response.data.results;
  } catch (err) {
    error = {
      status: err.response?.status || "Network Error",
      message: err.response?.data?.message || err.message || "Unknown error",
    };
  }

  try {
    const cartRes = await api.get(`/cart/`);
    console.log("CART RESPONSE:", cartRes.data);
    cartCount = cartRes.data.count;   
  } catch (err) {
    cartCount = 0;
  }


  // ---------- CURRENT USER CHECK ----------
  try {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("sessionid");

  if (sessionCookie) {
    const userRes = await api.get("/accounts/user/", {
      headers: {
        Cookie: `sessionid=${sessionCookie.value}`,
      },
    });

    user = userRes.data;
  }
  } catch (err) {
  user = null;
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
           <SearchBar />
          {/* search-wrap .end// */}
        </div>{" "}
        {/* col.// */}
        <div className="col-lg-3 col-sm-6 col-8 order-2 order-lg-3">
          <div className="d-flex justify-content-end mb-3 mb-lg-0">
            <div className="widget-header">
            {user ? (
              <>
                <small className="title text-muted">
                  Welcome, {user.name}!
                </small>
                <div>
                  <Link href="/dashboard">Dashboard</Link>
                  <span className="dark-transp"> | </span>
                  <LogoutButton />
                </div>
              </>
            ) : (
              <>
                <small className="title text-muted">Welcome guest!</small>
                <div>
                  <Link href="./signin">Login</Link>
                  <span className="dark-transp"> | </span>
                  <Link href="./register">Register</Link>
                </div>
              </>
            )}
          </div>
            <CartCounter />
            
           
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