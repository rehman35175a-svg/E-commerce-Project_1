"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import api from "@/lib/axios";


async function fetchCsrfToken() {
  await api.get(`/accounts/csrf/`);
}

function goBackOrHome(router) {
  if (typeof window !== "undefined" && window.history.length > 1) {
    router.back();
  } else {
    router.push("/");
  }
}

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next");

  const [successMessage, setSuccessMessage] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await api.get("/accounts/user/");
        if (response.data) {
          if (nextUrl) {
            router.replace(nextUrl);
          } else {
            goBackOrHome(router);
          }
          return;
        }
      } catch (err) {
      }
      setCheckingAuth(false);
    };

    checkLogin();
  }, [router, nextUrl]);

  useEffect(() => {
    if (searchParams.get("verified") === "true") {
      setSuccessMessage("Your account has been verified! You can now log in.");
    }
  }, [searchParams]);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Enter a valid email address";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setLoading(true);
    try {
      await fetchCsrfToken();

      const res = await api.post(
        `/accounts/login/`,
        { email: formData.email, password: formData.password },
      );

      window.dispatchEvent(new Event("cartUpdated"));

      if (nextUrl) {
      router.push(nextUrl);
    } else {
      router.push("/");
    }
    router.refresh();
    
    } catch (err) {
      if (err.response?.data) {
        const backendErrors = err.response.data;
        if (typeof backendErrors === "object" && !backendErrors.message) {
          setErrors((prev) => ({ ...prev, ...backendErrors }));
        }
        setServerError(backendErrors.message || "Invalid email or password");
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return null;
  }

  return (
    <section className="section-conten padding-y" style={{ minHeight: "84vh" }}>
      <div className="card mx-auto" style={{ maxWidth: 380, marginTop: 100 }}>
        <div className="card-body">
          <h4 className="card-title mb-4">Sign in</h4>

          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          {serverError && <div className="alert alert-danger">{serverError}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <small className="text-danger">{errors.password}</small>}
            </div>

            <div className="form-group">
              <Link href="/forgot-password" className="float-right"> Forgot password? </Link>
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading ? "Please wait..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <p className="text-center mt-4">
        Don't have account? <Link href="/register">Sign up</Link>
      </p>
      <br />
      <br />
    </section>
  );
}