"use client";

import { useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";

// function getCookie(name) {
//   if (typeof document === "undefined") return null;
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(";").shift();
//   return null;
// }

async function fetchCsrfToken() {
  await api.get(`/accounts/csrf/`);
}

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError("Enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      await fetchCsrfToken();
      const res = await api.post( `/accounts/password-reset-request/`, { email } );
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-conten padding-y" style={{ minHeight: "84vh" }}>
      <div className="card mx-auto" style={{ maxWidth: 380, marginTop: 100 }}>
        <div className="card-body">
          <h4 className="card-title mb-4">Forgot Password</h4>

          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          {!message && (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <p className="text-center mt-4">
        Remember your password? <Link href="/signin">Log In</Link>
      </p>
    </section>
  );
}