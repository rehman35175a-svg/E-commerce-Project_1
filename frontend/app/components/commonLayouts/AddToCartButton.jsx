"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Link from "next/link";


async function fetchCsrfToken() {
    await api.get("/accounts/csrf/");
}


export default function AddToCartButton({ product_id }) {

    const [inCart, setInCart] = useState(false);
    const [error, setError] = useState(null);


    // Check if product already exists in cart
    useEffect(() => {
        fetchCartItem();
    }, [product_id]);


    const fetchCartItem = async () => {

        try {

            const response = await api.get(`/cart/get/${product_id}/`);

            const data = response.data;

            const items = data.results !== undefined
                ? data.results
                : data;

            setInCart(items.length > 0);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                err.message
            );

        }

    };


    const postCartItem = async () => {

        try {

            // Get CSRF cookie
            await fetchCsrfToken();

            await api.post( `/cart/${product_id}/`);


            // Refresh cart button
            await fetchCartItem();

            // Update cart counter
            window.dispatchEvent(
                new Event("cartUpdated")
            );


        } catch (err) {

            console.log("ADD TO CART ERROR:", err);
            console.log("STATUS:", err.response?.status);
            console.log("DATA:", err.response?.data);

            setError(
                err.response?.data?.message ||
                err.response?.data?.detail ||
                err.message
            );

        }

    };


    if (error) {

        return (
            <button
                className="btn btn-danger btn-block"
                disabled
            >
                {error}
            </button>
        );

    }


    return inCart ? (

        <Link
            href="/cart"
            className="btn btn-success btn-block"
        >
            View Cart
        </Link>

    ) : (

        <button
            className="btn btn-primary btn-block"
            onClick={postCartItem}
        >
            Add To Cart
        </button>

    );

}