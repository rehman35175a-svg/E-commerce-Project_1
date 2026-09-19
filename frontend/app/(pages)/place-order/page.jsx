"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import Link from "next/link";

export default function PlaceOrder() {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);

  const [summary, setSummary] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  const [addressForm, setAddressForm] = useState({
    full_name: "",
    phone: "",
    address_line: "",
    city: "",
    state: "",
    postal_code: "",
    country: "Pakistan",
    save_address: true,
  });

  const [addressErrors, setAddressErrors] = useState({});  

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const getImageUrl = (image) => {
    if (!image) return "";
    return image.startsWith("http") ? image : `http://127.0.0.1:8000${image}`;
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        await api.get("/accounts/user/");
        setCheckingAuth(false);
        fetchSummary();
      } catch (err) {
        router.replace("/signin?next=/place-order");
      }
    };
    checkLogin();
  }, [router]);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const res = await api.get("/orders/checkout/summary/");
      setSummary(res.data);

      if (res.data.addresses.length > 0) {
        const defaultAddr = res.data.addresses.find((a) => a.is_default) || res.data.addresses[0];
        setSelectedAddressId(defaultAddr.id);
      } else {
        setShowNewAddressForm(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load checkout summary.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddressChange = (e) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };

  // 🆕 NAYA — Address form validate karne wala function
  const validateAddressForm = () => {
    const errors = {};

    if (!addressForm.full_name.trim()) errors.full_name = "Full name is required";
    if (!addressForm.phone.trim()) errors.phone = "Phone number is required";
    if (!addressForm.address_line.trim()) errors.address_line = "Address is required";
    if (!addressForm.city.trim()) errors.city = "City is required";

    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async () => {
    setError("");

    // 🆕 NAYA — Sirf tab validate karo jab naya address form dikh raha ho
    if (showNewAddressForm) {
      if (!validateAddressForm()) {
        setError("Please fill in all required address fields.");
        return;   // Backend call hi mat karo
      }
    } else if (!selectedAddressId) {
      setError("Please select a shipping address.");
      return;
    }

    setPlacing(true);

    try {
      const payload = { payment_method: paymentMethod };

      if (showNewAddressForm) {
        Object.assign(payload, addressForm);
      } else {
        payload.address_id = selectedAddressId;
      }

      const res = await api.post("/orders/checkout/place-order/", payload);

      window.dispatchEvent(new Event("cartUpdated"));
      router.push(`/order-complete?order_number=${res.data.order.order_number}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  if (checkingAuth || loading) {
    return (
      <section className="section-content padding-y">
        <div className="container text-center">
          <p>Loading checkout...</p>
        </div>
      </section>
    );
  }

  if (error && !summary) {
    return (
      <section className="section-content padding-y">
        <div className="container text-center">
          <div className="alert alert-danger">{error}</div>
          <Link href="/cart" className="btn btn-primary mt-3">Back to Cart</Link>
        </div>
      </section>
    );
  }

  const hasValidItems = summary.items.some((item) => !item.out_of_stock);

  return (
    <section className="section-content padding-y">
      <div className="container">
        <h3 className="mb-4">Checkout</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        {summary.has_out_of_stock && (
          <div className="alert alert-warning">
            Some items in your cart are out of stock and will not be included in this order.
          </div>
        )}

        <div className="row">
          <div className="col-md-7">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title mb-3">Shipping Address</h5>

                {summary.addresses.length > 0 && !showNewAddressForm && (
                  <>
                    {summary.addresses.map((addr) => (
                      <label
                        key={addr.id}
                        className="d-flex align-items-start mb-3 p-3 border rounded"
                        style={{ cursor: "pointer" }}
                      >
                        <input
                          type="radio"
                          name="address"
                          checked={selectedAddressId === addr.id}
                          onChange={() => setSelectedAddressId(addr.id)}
                          className="mr-3 mt-1"
                        />
                        <div>
                          <strong>{addr.full_name}</strong> {addr.is_default && <span className="badge badge-primary ml-2">Default</span>}
                          <p className="mb-0 text-muted">
                            {addr.phone}<br />
                            {addr.address_line}, {addr.city}, {addr.state} {addr.postal_code}, {addr.country}
                          </p>
                        </div>
                      </label>
                    ))}

                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => setShowNewAddressForm(true)}
                    >
                      + Add New Address
                    </button>
                  </>
                )}

                {showNewAddressForm && (
                  <div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label>Full Name</label>
                        <input
                          className={`form-control ${addressErrors.full_name ? "is-invalid" : ""}`}
                          name="full_name"
                          value={addressForm.full_name}
                          onChange={handleAddressChange}
                        />
                        {addressErrors.full_name && (
                          <small className="text-danger">{addressErrors.full_name}</small>
                        )}
                      </div>
                      <div className="form-group col-md-6">
                        <label>Phone</label>
                        <input
                          className={`form-control ${addressErrors.phone ? "is-invalid" : ""}`}
                          name="phone"
                          value={addressForm.phone}
                          onChange={handleAddressChange}
                        />
                        {addressErrors.phone && (
                          <small className="text-danger">{addressErrors.phone}</small>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Address</label>
                      <input
                        className={`form-control ${addressErrors.address_line ? "is-invalid" : ""}`}
                        name="address_line"
                        value={addressForm.address_line}
                        onChange={handleAddressChange}
                      />
                      {addressErrors.address_line && (
                        <small className="text-danger">{addressErrors.address_line}</small>
                      )}
                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label>City</label>
                        <input
                          className={`form-control ${addressErrors.city ? "is-invalid" : ""}`}
                          name="city"
                          value={addressForm.city}
                          onChange={handleAddressChange}
                        />
                        {addressErrors.city && (
                          <small className="text-danger">{addressErrors.city}</small>
                        )}
                      </div>
                      <div className="form-group col-md-4">
                        <label>State</label>
                        <input
                          className="form-control"
                          name="state"
                          value={addressForm.state}
                          onChange={handleAddressChange}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label>Postal Code</label>
                        <input
                          className="form-control"
                          name="postal_code"
                          value={addressForm.postal_code}
                          onChange={handleAddressChange}
                        />
                      </div>
                    </div>

                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="saveAddr"
                        checked={addressForm.save_address}
                        onChange={(e) => setAddressForm({ ...addressForm, save_address: e.target.checked })}
                      />
                      <label className="form-check-label" htmlFor="saveAddr">
                        Save this address for future orders
                      </label>
                    </div>

                    {summary.addresses.length > 0 && (
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => setShowNewAddressForm(false)}
                      >
                        Use Saved Address Instead
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title mb-3">Payment Method</h5>

                {[
                  { value: "COD", label: "Cash on Delivery" },
                  { value: "JAZZCASH", label: "JazzCash" },
                  { value: "EASYPAISA", label: "EasyPaisa" },
                  { value: "BANK", label: "Bank Transfer" },
                ].map((method) => (
                  <label key={method.value} className="d-flex align-items-center mb-2" style={{ cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="payment"
                      value={method.value}
                      checked={paymentMethod === method.value}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-2"
                    />
                    {method.label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-3">Order Summary</h5>

                {summary.items.map((item) => (
                  <div
                    key={item.cart_item_id}
                    className="d-flex align-items-center mb-3 pb-2 border-bottom"
                    style={{
                      opacity: item.out_of_stock ? 0.4 : 1,
                      filter: item.out_of_stock ? "blur(0.5px)" : "none",
                      position: "relative",
                    }}
                  >
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.product_name}
                      style={{ width: 50, height: 50, objectFit: "cover", marginRight: 10 }}
                    />
                    <div className="flex-grow-1">
                      <p className="mb-0">{item.product_name}</p>
                      <small className="text-muted">
                        Qty: {item.quantity} × ${item.price}
                      </small>
                      {item.out_of_stock && (
                        <div>
                          <span className="badge badge-danger">Out of Stock</span>
                        </div>
                      )}
                    </div>
                    {!item.out_of_stock && <strong>${item.sub_total}</strong>}
                  </div>
                ))}

                <div className="d-flex justify-content-between mt-3">
                  <span>Subtotal</span>
                  <span>${summary.total}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Tax</span>
                  <span>${summary.tax}</span>
                </div>
                <div className="d-flex justify-content-between font-weight-bold mt-2 pt-2 border-top">
                  <span>Grand Total</span>
                  <span>${summary.grand_total}</span>
                </div>

                <button
                  className="btn btn-primary btn-block mt-4"
                  onClick={handlePlaceOrder}
                  disabled={placing || !hasValidItems}
                >
                  {placing ? "Placing Order..." : "Place Order"}
                </button>

                {!hasValidItems && (
                  <p className="text-danger text-center mt-2 mb-0">
                    All items in your cart are out of stock.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}