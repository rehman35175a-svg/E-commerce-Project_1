"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

async function fetchCsrfToken() {
  await api.get("/accounts/csrf/");
}

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetchCsrfToken();
  
      await api.post( "/accounts/logout/");

      router.refresh();
    } catch (err) {
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <a href="#" onClick={handleLogout} style={{ cursor: "pointer" }}>
      {loading ? "Logging out..." : "Logout"}
    </a>
  );
}