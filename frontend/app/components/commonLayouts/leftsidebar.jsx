"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LeftSideBar({ categories }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = pathname.split("/")[1] || "";

  
  const [minPrice, setMinPrice] = useState(searchParams.get("min_price") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max_price") || "");

  // ---------- Helper: URL update karne ke liye ----------
  const updateFilters = (newParams) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      params.delete(key); // Purani values hatao

      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value) {
        params.set(key, value);
      }
    });

    params.set("page", "1"); // Filter change hote hi page 1 pe reset karo

    router.push(`${pathname}?${params.toString()}`);
  };

  // ---------- Price apply button ----------
  const handleApplyPrice = () => {
    updateFilters({ min_price: minPrice, max_price: maxPrice });
  };

  // ---------- Category link build karte waqt existing filters preserve karo ----------
  const buildCategoryHref = (slug) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    const query = params.toString();
    return `/${slug}${query ? `?${query}` : ""}`;
  };

  return (
    <aside className="col-md-3">
      <div className="card">
        {/* ---------- Categories ---------- */}
        <article className="filter-group">
          <header className="card-header">
            <a
              href="#"
              data-toggle="collapse"
              data-target="#collapse_1"
              aria-expanded="true"
            >
              <i className="icon-control fa fa-chevron-down" />
              <h6 className="title">Categories</h6>
            </a>
          </header>
          <div className="filter-content collapse show" id="collapse_1">
            <div className="card-body">
              <ul className="list-menu">
                {categories.length > 0 &&
                  categories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        href={buildCategoryHref(cat.SLug)}
                        className={
                          currentCategory === cat.SLug ? "text-primary font-weight-bold" : ""
                        }
                      >
                        {cat.Cate_Name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </article>

        

        {/* ---------- Price Range ---------- */}
        <article className="filter-group">
          <header className="card-header">
            <a
              href="#"
              data-toggle="collapse"
              data-target="#collapse_3"
              aria-expanded="true"
            >
              <i className="icon-control fa fa-chevron-down" />
              <h6 className="title">Price range </h6>
            </a>
          </header>
          <div className="filter-content collapse show" id="collapse_3">
            <div className="card-body">
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Min</label>
                  <select
                    className="mr-2 form-control"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  >
                    <option value="">$0</option>
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
                  <select
                    className="mr-2 form-control"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  >
                    <option value="">No limit</option>
                    <option value={50}>$50</option>
                    <option value={100}>$100</option>
                    <option value={150}>$150</option>
                    <option value={200}>$200</option>
                    <option value={500}>$500</option>
                    <option value={1000}>$1000</option>
                    <option value={2000}>$2000+</option>
                  </select>
                </div>
              </div>
              <button
                className="btn btn-block btn-primary"
                onClick={handleApplyPrice}
              >
                Apply
              </button>
            </div>
          </div>
        </article>
      </div>
    </aside>
  );
}