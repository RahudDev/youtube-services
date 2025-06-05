import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { API } from "../App";

interface PurchasedItem {
  name: string;
  quantity: number;
  unitPrice: number;
  image?: string;
}

interface PaymentDetails {
  actually_paid: string;
  pay_currency: string;
  [key: string]: any; // allow additional dynamic properties
}

interface OrderData {
  orderID: string;
  status: string;
  totalAmount: string;
  purchasedItems: PurchasedItem[];
  paymentDetails: PaymentDetails;
}

const CryptoSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const NP_id = searchParams.get("NP_id");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get<OrderData>(`${API}/api/crypto/order-by-payment-id/${NP_id}`);
        setOrderData(res.data);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("❌ Unable to fetch order. Please check your payment ID or contact support.");
      } finally {
        setLoading(false);
      }
    };

    if (NP_id) {
      fetchOrder();
    } else {
      setError("⚠️ Missing payment ID from URL.");
      setLoading(false);
    }
  }, [NP_id]);

  // Loading state
  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <h2 className="mb-3">🔗 Payment Result</h2>
          <p className="fs-5 text-primary">Loading your payment details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <h2 className="mb-3">🔗 Payment Result</h2>
          <p className="fs-5 text-danger">{error}</p>
        </div>
      </div>
    );
  }

  // No order data
  if (!orderData) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <h2 className="mb-3">🔗 Payment Result</h2>
          <p className="fs-5 text-warning">⚠️ Order not found</p>
        </div>
      </div>
    );
  }

  const { purchasedItems, totalAmount, paymentDetails, status } = orderData;

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h2 className="mb-3">🔗 Payment Result</h2>
        <p className="fs-5 text-success">
          ✅ Crypto payment successful! Thank you for your order.
        </p>
        
        {/* Payment Summary */}
        <div className="mt-4 mb-4">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card shadow-sm border-0 bg-light">
                <div className="card-body">
                  <h5 className="card-title mb-3 fw-bold">💳 Payment Summary</h5>
                  <div className="row text-start">
                    <div className="col-md-6">
                      <p className="mb-2 fw-bold"><strong>Status:</strong> <span className="text-success fw-bold">{status}</span></p>
                      <p className="mb-2 fw-bold"><strong>Crypto Paid:</strong> {paymentDetails?.actually_paid} {paymentDetails?.pay_currency}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="mb-2 fw-bold"><strong>Total (USD):</strong> ${totalAmount}</p>
                      <p className="mb-2 fw-bold"><strong>Order ID:</strong> {orderData.orderID}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {purchasedItems.length > 0 && (
        <div className="mt-5">
          <h4 className="text-center mb-4">Youtube Services Order</h4>
          <div className="row justify-content-center">
            {purchasedItems.map((item, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card shadow-lg border-0 h-100">
                  <img
                    src={item.image || "https://via.placeholder.com/400x250?text=No+Image"}
                    alt={item.name || "Service Image"}
                    className="card-img-top-crypto"
                    style={{
                      height: "300px",
                      objectFit: "cover",
                      borderTopLeftRadius: "1rem",
                      borderTopRightRadius: "1rem",
                    }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text mb-1">
                      <strong>Quantity:</strong> {item.quantity}
                    </p>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <h5 className="fw-bold text-success">
              💰 Total Paid: ${totalAmount} USD
            </h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoSuccess;