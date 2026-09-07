"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Link from "next/link";


export default function Cart() {
    const [cart, setCart] = useState({
        items: [],
        total: 0,
        quantity: 0,
        tax: 0,
        grand_total: 0,
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null); // disables buttons mid-request

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const response = await api.get(
                `/cart/calculation/`,
                
            );
            setCart(response.data);
            setError(null);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    const increaseQuantity = async (productId) => {
        try {
            setUpdatingId(productId);
            const response = await api.post(
                `/cart/${productId}/`,
               
            );
            setCart(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setUpdatingId(null);
        }
    };

    const decreaseQuantity = async (productId) => {
        try {
            setUpdatingId(productId);
            const response = await api.post(
                `/cart/remove_cart/${productId}/`,
                
            );
            
            setCart(response.data);
            setError(null);
            window.dispatchEvent(new Event("cartUpdated"));   // For Cart Counter
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setUpdatingId(null);
        }
    };

    const removeItem = async (productId) => {
        try {
            setUpdatingId(productId);
            const response = await api.post(
                `/cart/remove_cart_item/${productId}/`,
                
            );
            
            setCart(response.data);
            setError(null);
            window.dispatchEvent(new Event("cartUpdated"));   // For Cart Counter
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setUpdatingId(null);
        }
    };

    const formatCurrency = (value) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(value || 0);

    const getImageUrl = (image) => {
        if (!image) return "";
        return image.startsWith("http") ? image : `http://127.0.0.1:8000${image}`;
    };

    if (loading) {
        return (
            <section className="section-content padding-y bg">
                <div className="container text-center">
                    <p>Loading cart...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="section-content padding-y bg">
                <div className="container text-center">
                    <p className="text-danger">{error}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="section-content padding-y bg">
            <div className="container">
                <div className="row">
                    <aside className="col-lg-9">
                        <div className="card">
                            <table className="table table-borderless table-shopping-cart">
                                <thead className="text-muted">
                                    <tr className="small text-uppercase">
                                        <th scope="col">Product</th>
                                        <th scope="col" width={120}>Quantity</th>
                                        <th scope="col" width={120}>Price</th>
                                        <th scope="col" className="text-right" width={200}> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.items.length > 0 ? (
                                        cart.items.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <figure className="itemside align-items-center">
                                                        <Link href={`/${item.product.category_key.SLug}/${item.product.slug}`} className="title">
                                                        <div className="aside">
                                                            <img
                                                                src={getImageUrl(item.product.image)}
                                                                className="img-sm"
                                                                alt={item.product.Product_name}
                                                            />
                                                        </div>
                                                        </Link>
                                                        <figcaption className="info">

                                                            <Link href={`/${item.product.category_key.SLug}/${item.product.slug}`} className="title">
                                                                {item.product.Product_name}
                                                            </Link>
                                                            <p className="text-muted small">
                                                                {item.product.slug} <br /> Stock: {item.product.stock}
                                                            </p>
                                                        </figcaption>
                                                    </figure>
                                                </td>
                                                <td>
                                                    <div className="col">
                                                        <div className="input-group input-spinner">
                                                            <div className="input-group-prepend">
                                                                <button
                                                                    className="btn btn-light"
                                                                    type="button"
                                                                    disabled={updatingId === item.product.id}
                                                                    onClick={() => decreaseQuantity(item.product.id)}
                                                                >
                                                                    {" "}
                                                                    <i className="fa fa-minus" />{" "}
                                                                </button>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={item.quantity}
                                                                readOnly
                                                            />
                                                            <div className="input-group-append">
                                                                <button
                                                                    className="btn btn-light"
                                                                    type="button"
                                                                    disabled={
                                                                        updatingId === item.product.id ||
                                                                        item.quantity >= item.product.stock
                                                                    }
                                                                    onClick={() => increaseQuantity(item.product.id)}
                                                                >
                                                                    {" "}
                                                                    <i className="fa fa-plus" />{" "}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="price-wrap">
                                                        <var className="price">
                                                            {formatCurrency(item.sub_total)}
                                                        </var>
                                                        <small className="text-muted">
                                                            {" "}{formatCurrency(item.product.price)}{" "}
                                                        </small>
                                                    </div>
                                                </td>
                                                <td className="text-right">
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger"
                                                        disabled={updatingId === item.product.id}
                                                        onClick={() => removeItem(item.product.id)}
                                                    >
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="text-center py-4">
                                                <h5 className="mb-3"> Your cart is empty. </h5>

                                                <Link href="/store" className="btn btn-primary">
                                                 Continue Shopping
                                                </Link>
                                            </td>

                                        </tr>
                                        
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </aside>

                    <aside className="col-lg-3">
                        <div className="card">
                            <div className="card-body">
                                <dl className="dlist-align">
                                    <dt>Total price:</dt>
                                    <dd className="text-right">{formatCurrency(cart.total)}</dd>
                                </dl>
                                <dl className="dlist-align">
                                    <dt>Tax:</dt>
                                    <dd className="text-right">{formatCurrency(cart.tax)}</dd>
                                </dl>
                                <dl className="dlist-align">
                                    <dt>Total:</dt>
                                    <dd className="text-right text-dark b">
                                        <strong>{formatCurrency(cart.grand_total)}</strong>
                                    </dd>
                                </dl>
                                <hr />
                                <p className="text-center mb-3">
                                    <img src="./images/misc/payments.png" height={26} />
                                </p>
                                <Link href="/checkout" className="btn btn-primary btn-block">
                                    Checkout
                                </Link>
                                <Link href="/store" className="btn btn-light btn-block">
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}