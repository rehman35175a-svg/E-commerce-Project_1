"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

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

export default function Register() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
      const checkLogin = async () => {
        try {
          const response = await api.get("/accounts/user/");
          if (response.data) {
            goBackOrHome(router);
            return;
          }
        } catch (err) {
          // 401/403 aana normal hai — login form dikhega
        }
        setCheckingAuth(false);
      };
  
      checkLogin();
    }, [router]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ---------- FRONTEND VALIDATION ----------
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirm_password) {
      newErrors.confirm_password = "Please confirm your password";
    } else if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return; // Frontend validation fail → backend call hi mat karo

    setLoading(true);

    try {
      await fetchCsrfToken(); // CSRF cookie set karwao

      const res = await api.post(`/accounts/registration/`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      setRegistrationSuccess(true); // Register hote hi verification message dikhao
      
    } catch (err) {
      if (err.response?.data) {
        // Backend se aane wale field-wise errors handle karo
        const backendErrors = err.response.data;
        if (typeof backendErrors === "object") {
          setErrors((prev) => ({ ...prev, ...backendErrors }));
        }
        setServerError(backendErrors.message || "Registration failed");
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
  
  // ---------- REGISTRATION SUCCESS — Verification message dikhao ----------
  if (registrationSuccess) {
    return (
      <section className="section-content padding-y">
        <div
          className="card mx-auto text-center p-5"
          style={{ maxWidth: 520, marginTop: 40 }}
        >
          <h4 className="text-success mb-3">✔ Registration Successful</h4>
          <p>
            Please verify your account via email. Check your inbox for the
            verification link.
          </p>
          <Link href="/signin" className="btn btn-outline-primary mt-3">
            Go to Login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section-content padding-y">
      <div className="card mx-auto" style={{ maxWidth: 520, marginTop: 40 }}>
        <article className="card-body">
          <header className="mb-4">
            <h4 className="card-title">Sign up</h4>
          </header>

          {serverError && (
            <div className="alert alert-danger" role="alert">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="col form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <small className="text-danger">{errors.name}</small>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email ? (
                <small className="text-danger">{errors.email}</small>
              ) : (
                <small className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              )}
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <small className="text-danger">{errors.phone}</small>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Create password</label>
                <input
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <small className="text-danger">{errors.password}</small>
                )}
              </div>
              <div className="form-group col-md-6">
                <label>Repeat password</label>
                <input
                  className={`form-control ${
                    errors.confirm_password ? "is-invalid" : ""
                  }`}
                  type="password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                />
                {errors.confirm_password && (
                  <small className="text-danger">
                    {errors.confirm_password}
                  </small>
                )}
              </div>
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading ? "Please wait..." : "Register"}
              </button>
            </div>
          </form>
        </article>
      </div>

      <p className="text-center mt-4">
        Have an account? <Link href="/signin">Log In</Link>
      </p>
      <br />
      <br />
    </section>
  );
}