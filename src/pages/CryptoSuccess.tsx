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
        setError("Unable to fetch order. Please check your payment ID.");
      } finally {
        setLoading(false);
      }
    };

    if (NP_id) fetchOrder();
  }, [NP_id]);

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (error) return <div className="container"><p>{error}</p></div>;
  if (!orderData) return <div className="container"><p>Order not found</p></div>;

  const { purchasedItems, totalAmount, paymentDetails, status } = orderData;

  return (
    <div className="container mt-5">
      <h1 className="text-success">✅ Payment Successful</h1>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Crypto Paid:</strong> {paymentDetails?.actually_paid} {paymentDetails?.pay_currency}</p>
      <p><strong>Total (USD):</strong> ${totalAmount}</p>

      <h3 className="mt-4">🛍️ Items Purchased:</h3>
      <ul className="list-unstyled">
        {purchasedItems.map((item, idx) => (
          <li key={idx} className="d-flex align-items-center mb-3">
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="me-3"
                style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }}
              />
            )}
            <div>
              <h5 className="mb-1">{item.name}</h5>
              <p className="mb-0">Qty: {item.quantity} x ${item.unitPrice}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoSuccess;
