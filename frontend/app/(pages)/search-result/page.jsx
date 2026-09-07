import api from "@/lib/axios";
import Link from 'next/link';
import LeftSideBar from "../../components/commonLayouts/leftsidebar";
import AddToCartButton from "../../components/commonLayouts/AddToCartButton";

const PAGE_SIZE = 8;

export default async function SearchResult({ searchParams }) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  const query = params?.q || "";

  let products = [];
  let categories = [];
  let totalCount = 0;
  let error = null;

  // ---------- Query string banao — search + page + filters sab ek sath ----------
  const queryString = new URLSearchParams();
  queryString.set("page", currentPage);
  if (query) queryString.set("search", query);
  if (params?.min_price) queryString.set("min_price", params.min_price);
  if (params?.max_price) queryString.set("max_price", params.max_price);
  if (params?.size) {
    (Array.isArray(params.size) ? params.size : [params.size]).forEach((s) =>
      queryString.append("size", s)
    );
  }

  // ---------- Sirf EK API call — search + filters + pagination sab sath ----------
  try {
    const response = await api.get(
      `/store/?${queryString.toString()}`
    );

    if (response.data.results) {
      products = response.data.results;
      totalCount = response.data.count;
    } else {
      products = response.data;
      totalCount = products.length;
    }
  } catch (err) {
    error = {
      status: err.response?.status || "Network Error",
      message: err.response?.data?.message || err.message || "Unknown error",
    };
  }

  // ---------- Categories fetch (sidebar ke liye) ----------
  try {
    const catRes = await api.get(`/category/`);
    categories = catRes.data.results || catRes.data;
  } catch (err) {
    categories = [];
  }

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // ---------- Pagination link banate waqt search query aur filters preserve karo ----------
  const buildPageHref = (pageNum) => {
    const p = new URLSearchParams(queryString);
    p.set("page", pageNum);
    return `/search-result?${p.toString()}`;
  };

  return (
    <>
      <section className="section-pagetop bg">
        <div className="container">
          <h2 className="title-page">Search Results</h2>
        </div>
      </section>

      <section className="section-content padding-y">
        <div className="container">
          <div className="row">
            <LeftSideBar categories={categories} />

            <main className="col-md-9">
              <header className="border-bottom mb-4 pb-3">
                <div className="form-inline">
                  {totalCount > 0 && (
                    <span className="mr-md-auto">
                      {totalCount} Items found for "{query}"
                    </span>
                  )}
                </div>
              </header>

              <div className="row">
                {products.length > 0 ? (
                  products.map((product) => (
                    <div className="col-md-4" key={product.id}>
                      <figure className="card card-product-grid">
                        <Link
                          href={`/${product.category_key?.SLug || ""}/${product.slug}`}
                          className="title"
                        >
                          <div className="img-wrap">
                            <img src={product.image} />
                          </div>
                        </Link>

                        <figcaption className="info-wrap">
                          <div className="fix-height">
                            <Link
                              href={`/${product.category_key?.SLug || ""}/${product.slug}`}
                              className="title"
                            >
                              {" "}
                              {product.Product_name}{" "}
                            </Link>

                            <div className="price-wrap mt-2">
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                              }).format(product.price)}
                              <del className="price-old">$1980</del>
                            </div>
                          </div>
                          {product.stock > 0 ? (
                            <AddToCartButton product_id={product.id} />
                          ) : (
                            <label className="btn btn-block btn-secondary">
                              Out of Stock
                            </label>
                          )}
                        </figcaption>
                      </figure>
                    </div>
                  ))
                ) : error ? (
                  <div className="text-danger">
                    {" "}
                    {error.status} - {error.message}{" "}
                  </div>
                ) : (
                  <p>No products found for "{query}"</p>
                )}
              </div>

              {totalPages > 1 && (
                <nav className="mt-4" aria-label="Page navigation sample">
                  <ul className="pagination">
                    <li
                      className={`page-item ${currentPage <= 1 ? "disabled" : ""}`}
                    >
                      <Link
                        className="page-link"
                        href={buildPageHref(Math.max(currentPage - 1, 1))}
                      >
                        Previous
                      </Link>
                    </li>

                    {pageNumbers.map((num) => (
                      <li
                        key={num}
                        className={`page-item ${num === currentPage ? "active" : ""}`}
                      >
                        <Link className="page-link" href={buildPageHref(num)}>
                          {num}
                        </Link>
                      </li>
                    ))}

                    <li
                      className={`page-item ${
                        currentPage >= totalPages ? "disabled" : ""
                      }`}
                    >
                      <Link
                        className="page-link"
                        href={buildPageHref(Math.min(currentPage + 1, totalPages))}
                      >
                        Next
                      </Link>
                    </li>
                  </ul>
                </nav>
              )}
            </main>
          </div>
        </div>
      </section>
    </>
  );
}