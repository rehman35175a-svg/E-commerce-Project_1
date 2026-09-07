"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import Link from "next/link";

export default function VerifyEmail() {
  const { uid, token } = useParams();
  const router = useRouter();
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await api.post(`/accounts/verify-email/${uid}/${token}/`);
        setStatus("success");
        setMessage(res.data.message);

        setTimeout(() => {
          router.push("/signin?verified=true");
        }, 2000);
      } catch (err) {
        setStatus("error");
        setMessage(err.response?.data?.message || "Verification failed.");
      }
    };
    verify();
  }, [uid, token, router]);

  return (
    <section
      className="section-content padding-y"
      style={{ minHeight: "70vh" }}
    >
      <div
        className="card mx-auto text-center p-5"
        style={{ maxWidth: 480, marginTop: 60 }}
      >
        {status === "verifying" && <p>Verifying your email...</p>}

        {status === "success" && (
          <>
            <h4 className="text-success mb-3">✔ Email Verified</h4>
            <p>{message}</p>
            <p className="text-muted">Redirecting to login...</p>
          </>
        )}

        {status === "error" && (
          <>
            <h4 className="text-danger mb-3">✘ Verification Failed</h4>
            <p>{message}</p>
            <Link href="/register" className="btn btn-outline-primary mt-3">
              Back to Register
            </Link>
          </>
        )}
      </div>
    </section>
  );
}