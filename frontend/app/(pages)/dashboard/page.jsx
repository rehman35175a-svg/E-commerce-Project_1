"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkLogin = async () => {
      try {
        await api.get("/accounts/user/");
        setCheckingAuth(false);
        fetchOrders();
      } catch (err) {
        router.replace("/signin?next=/dashboard");
      }
    };
    checkLogin();
  }, [router]);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/");
      setOrders(res.data.results || res.data); 
    } catch (err) {
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth || loading) {
    return (
      <section className="section-conten padding-y bg">
        <div className="container text-center">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-conten padding-y bg">
      <div className="container">
        <div className="row">
          <main className="col-md-12">
            <ul className="list-group">
              <span className="list-group-item active">Order history</span>
              {/* <a className="list-group-item" href="#">Transactions</a> */}
              
            </ul>
            <br />
          

        
            {error && <div className="alert alert-danger">{error}</div>}

            {orders.length === 0 && !error && (
              <div className="card p-5 text-center">
                <p>You haven't placed any orders yet.</p>
                <Link href="/store" className="btn btn-primary">Start Shopping</Link>
              </div>
            )}

            {orders.map((order) => (
              <article className="card mb-4" key={order.id}>
                <header className="card-header">
                  <strong className="d-inline-block mr-3">
                    Order ID: {order.order_number}
                  </strong>
                  <span>Order Date: {new Date(order.created_at).toLocaleDateString()}</span>
                </header>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-8">
                      <h6 className="text-muted">Delivery to</h6>
                      {order.address ? (
                        <p>
                          {order.address.full_name} <br />
                          Phone: {order.address.phone} <br />
                          {order.address.address_line}, {order.address.city}, {order.address.state}
                        </p>
                      ) : (
                        <p className="text-muted">No address on record</p>
                      )}
                    </div>
                    <div className="col-md-4">
                      <h6 className="text-muted">Payment</h6>
                      <p>
                        Method: {order.payment_method} <br />
                        Status: {order.payment_status} <br />
                        <span className="font-weight-bold">Total: ${order.grand_total}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <tbody>
                      {order.items.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <p className="title mb-0">{item.product_name}</p>
                            <var className="price text-muted">${item.price}</var>
                          </td>
                          <td>Qty: {item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            ))}
          </main>
        </div>
      </div>
    </section>
  );
}