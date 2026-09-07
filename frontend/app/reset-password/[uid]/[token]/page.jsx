"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import Link from "next/link";

export default function ResetPassword() {
  const { uid, token } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({ new_password: "", confirm_password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!formData.new_password) newErrors.new_password = "Password is required";
    else if (formData.new_password.length < 8) newErrors.new_password = "At least 8 characters";

    if (!formData.confirm_password) newErrors.confirm_password = "Please confirm your password";
    else if (formData.new_password !== formData.confirm_password) newErrors.confirm_password = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setLoading(true);
    try {
      await api.post(`/accounts/password-reset/${uid}/${token}/`,
        formData
      );
      setSuccess(true);
      setTimeout(() => router.push("/signin"), 2000);
    } catch (err) {
      const backendErrors = err.response?.data;
      if (backendErrors && typeof backendErrors === "object" && !backendErrors.message) {
        setErrors((prev) => ({ ...prev, ...backendErrors }));
      }
      setServerError(backendErrors?.message || "Reset failed. The link may be invalid or expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-conten padding-y" style={{ minHeight: "84vh" }}>
      <div className="card mx-auto" style={{ maxWidth: 380, marginTop: 100 }}>
        <div className="card-body">
          <h4 className="card-title mb-4">Reset Password</h4>

          {success ? (
            <div className="alert alert-success">
              Password reset successful! Redirecting to login...
            </div>
          ) : (
            <>
              {serverError && <div className="alert alert-danger">{serverError}</div>}
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="new_password"
                    className={`form-control ${errors.new_password ? "is-invalid" : ""}`}
                    value={formData.new_password}
                    onChange={handleChange}
                  />
                  {errors.new_password && <small className="text-danger">{errors.new_password}</small>}
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirm_password"
                    className={`form-control ${errors.confirm_password ? "is-invalid" : ""}`}
                    value={formData.confirm_password}
                    onChange={handleChange}
                  />
                  {errors.confirm_password && <small className="text-danger">{errors.confirm_password}</small>}
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                    {loading ? "Please wait..." : "Reset Password"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
      <p className="text-center mt-4">
        <Link href="/signin">Back to Login</Link>
      </p>
    </section>
  );
}