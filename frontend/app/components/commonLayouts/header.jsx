import api from "@/lib/axios";
import Link from "next/link";
import SearchBar from "./SearchBar";
import CartCounter from "./CartCounter";
import LogoutButton from "./LogoutButton";
import { cookies } from "next/headers";

export default async function Header() {
  let products = [];
  let error = null;
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

  return (
    <header className="section-header">
      
      <section className="header-main border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-2 col-md-3 col-6">
              <a href="./" className="brand-wrap">
                <img className="logo" src="/./images/logo.png" />
              </a>
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
                  {products.length > 0 &&
                    products.map((product) => (
                      <Link
                        className="dropdown-item"
                        href={`/${product.SLug}`}
                        key={product.id}
                      >
                        {product.Cate_Name}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
            <Link href="/store" className="btn btn-outline-primary">
              Store
            </Link>

            <div className="col-lg  col-md-6 col-sm-12 col">
              <SearchBar />
            </div>

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
              </div>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}