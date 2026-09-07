// CartCounter.jsx
"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Link from "next/link";

export default function CartCounter() {
  const [count, setCount] = useState(0);

  const fetchCount = async () => {
    try {
      const response = await api.get(`/cart/`);
      setCount(response.data.count || 0);
    } catch (err) {
      setCount(0);
    }
  };

  useEffect(() => {
    fetchCount();
    window.addEventListener("cartUpdated", fetchCount);
    return () => window.removeEventListener("cartUpdated", fetchCount);
  }, []);

  return (
    <Link
      href="/cart"
      className="widget-header pl-3 ml-3"
      style={{ position: "relative", display: "inline-block" }}
    >
      <div className="icon icon-sm rounded-circle border">
        <i className="fa fa-shopping-cart" />
      </div>
      <span
        className="badge badge-pill badge-danger notify"
        style={{
          position: "absolute",
          top: -6,
          right: -6,
          minWidth: 20,
          height: 20,
          padding: 0,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
          lineHeight: 1,
        }}
      >
        {count}
      </span>
    </Link>
  );
}