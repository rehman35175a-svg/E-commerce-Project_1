"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import Link from "next/link";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);

  // ---------- Debounced Search ----------
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/store/?search=${encodeURIComponent(query)}`
        );

        const results = response.data.results || response.data;
        setSuggestions(results.slice(0, 6)); // Sirf top 6 suggestions dikhao
      } catch (err) {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 400); // 400ms wait karo typing rukne ke baad, taake har keystroke pe request na jaye

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // ---------- Bahar click karne pe suggestions band karo ----------
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setShowSuggestions(false);
      router.push(`/search-result?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="search" ref={wrapperRef} style={{ position: "relative" }}>
      <form onSubmit={handleSubmit}>
        <div className="input-group w-100">
          <input
            type="text"
            className="form-control"
            style={{ width: "60%" }}
            placeholder="Search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => query && setShowSuggestions(true)}
            autoComplete="off"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">
              <i className="fa fa-search" />
            </button>
          </div>
        </div>
      </form>

      {/* ---------- Suggestions Dropdown ---------- */}
      {showSuggestions && query.trim() && (
        <div
          className="dropdown-menu show"
          style={{
            width: "60%",
            maxHeight: "300px",
            overflowY: "auto",
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 1000,
          }}
        >
          {loading && (
            <span className="dropdown-item-text text-muted">Searching...</span>
          )}

          {!loading && suggestions.length === 0 && (
            <span className="dropdown-item-text text-muted">
              No products found
            </span>
          )}

          {!loading &&
            suggestions.map((product) => (
              <Link
                key={product.id}
                href={`/${product.category_key?.SLug || ""}/${product.slug}`}
                className="dropdown-item d-flex align-items-center"
                onClick={() => setShowSuggestions(false)}
              >
                <img
                  src={product.image}
                  alt={product.Product_name}
                  style={{
                    width: 32,
                    height: 32,
                    objectFit: "cover",
                    marginRight: 8,
                  }}
                />
                <span>{product.Product_name}</span>
              </Link>
            ))}

          {!loading && suggestions.length > 0 && (
            <button
              type="button"
              className="dropdown-item text-primary text-center"
              onClick={() => {
                setShowSuggestions(false);
                router.push(`/search-result?q=${encodeURIComponent(query)}`);
              }}
            >
              View all results
            </button>
          )}
        </div>
      )}
    </div>
  );
}