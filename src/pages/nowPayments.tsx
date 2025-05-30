import React, { useState } from "react";
import axios from "axios";
import { API } from "../App";

const CreatePayment: React.FC = () => {
  const [productId, setProductId] = useState<number>(1);
  const [userId, setUserId] = useState<string>("");
  const [orderId, setOrderId] = useState<string>("");
  const [paymentUrl, setPaymentUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    setPaymentUrl("");

    try {
      const response = await axios.post(`${API}/api/crypto/create-payment`, {
        productId,
        userId,
        orderId,
      });

      const url = response.data?.invoice_url;

      if (url) {
        setPaymentUrl(url);
        window.open(url, "_blank"); // Automatically open invoice
      } else {
        setError("No invoice URL received.");
      }
    } catch (err: any) {
      console.error("Payment error:", err.response?.data || err.message);
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Create a Payment</h2>

      <label className="block mb-2">User ID</label>
      <input
        className="w-full border p-2 mb-4"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter user ID"
      />

      <label className="block mb-2">Order ID</label>
      <input
        className="w-full border p-2 mb-4"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        placeholder="Enter order ID"
      />

      <label className="block mb-2">Select Product</label>
      <select
        className="w-full border p-2 mb-4"
        value={productId}
        onChange={(e) => setProductId(parseInt(e.target.value))}
      >
        <option value={1}>YouTube Likes - $2</option>
        <option value={2}>YouTube Subscribers - $1</option>
        <option value={3}>YouTube Views - $3</option>
        <option value={4}>YouTube Comments - $4</option>
        <option value={5}>YouTube Shares - $2.5</option>
        <option value={6}>YouTube Watch Hours - $100</option>
      </select>

      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Processing..." : "Pay with LTC"}
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}
      {paymentUrl && (
        <p className="text-green-600 mt-4">
          Payment created!{" "}
          <a
            href={paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-700"
          >
            Open Invoice Again
          </a>
        </p>
      )}
    </div>
  );
};

export default CreatePayment;
