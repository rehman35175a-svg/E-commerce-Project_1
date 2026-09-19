"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/axios";
import Link from "next/link";

export default function OrderComplete() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order_number");

  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderNumber) return;

    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${orderNumber}/`);
        setOrder(res.data);
      } catch (err) {
        setError("Order not found.");
      }
    };

    fetchOrder();
  }, [orderNumber]);

  if (error) {
    return (
      <section className="section-content padding-y text-center">
        <p>{error}</p>
        <Link href="/" className="btn btn-primary">Go Home</Link>
      </section>
    );
  }

  if (!order) {
    return (
      <section className="section-content padding-y text-center">
        <p>Loading order details...</p>
      </section>
    );
  }

  return (
    <section className="section-content padding-y">
      <div className="container">
        <div className="card mx-auto text-center p-5" style={{ maxWidth: 600 }}>
          <h3 className="text-success mb-3">✔ Thank you! Your order has been placed.</h3>
          <p>Order Number: <strong>{order.order_number}</strong></p>
          <p>Payment Method: {order.payment_method}</p>
          <p>Grand Total: ${order.grand_total}</p>

          <div className="table-responsive mt-4">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.product_name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link href="/dashboard" className="btn btn-primary mt-3">View My Orders</Link>
        </div>
      </div>
    </section>
  );
}