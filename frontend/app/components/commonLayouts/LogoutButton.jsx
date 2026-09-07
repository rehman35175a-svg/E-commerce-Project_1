"use client";
import { useState } from "react";
import api from "@/lib/axios";


async function fetchCsrfToken() {
  await api.get("/accounts/csrf/");
}

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetchCsrfToken();

      await api.post("/accounts/logout/" );

      window.location.reload();   // Refresh the current window
    } catch (err) {
      console.error("Logout failed:", err);
      setLoading(false);
    }
  };

  return (
    <a href="#" onClick={handleLogout} style={{ cursor: "pointer" }}>
      {loading ? "Logging out..." : "Logout"}
    </a>
  );
}