import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API } from "../App";

type PurchasedItem = {
  image?: string;
  name?: string;
  quantity?: number;
  unitPrice?: number;
};

const PaypalSuccess = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Capturing your payment...");
  const [purchasedItems, setPurchasedItems] = useState<PurchasedItem[]>([]);
  const [total, setTotal] = useState(0);

  const hasRun = useRef(false); // Prevent duplicate fetches in dev mode

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const orderID = searchParams.get("token");

    const captureOrder = async () => {
      try {
        const response = await fetch(`${API}/api/paypal/orders/${orderID}/capture`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const jsonResponse = await response.json();
        console.log("Purchased items received:", jsonResponse.purchasedItems);

        if (!response.ok || jsonResponse.httpStatusCode >= 400) {
          throw new Error(jsonResponse?.error || "Unknown capture error");
        }

        setStatus("success");
        setMessage("✅ Payment successful! Thank you for your order.");

        if (Array.isArray(jsonResponse.purchasedItems)) {
          setPurchasedItems(jsonResponse.purchasedItems);

          const totalAmount = jsonResponse.purchasedItems.reduce((sum: number, item: PurchasedItem) => {
            const price = typeof item.unitPrice === "number" ? item.unitPrice : 0;
            const quantity = typeof item.quantity === "number" ? item.quantity : 0;
            return sum + price * quantity;
          }, 0);

          setTotal(totalAmount);
        }
      } catch (error) {
        console.error("Capture error:", error);
        setStatus("error");
        setMessage("❌ Failed to capture the payment. Please contact support.");
      }
    };

    if (orderID) {
      captureOrder();
    } else {
      setStatus("error");
      setMessage("⚠️ Missing order ID from PayPal.");
    }
  }, [searchParams]);

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h2 className="mb-3">🧾Payment Result</h2>
        <p className={`fs-5 ${status === "error" ? "text-danger" : "text-success"}`}>
          {message}
        </p>
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
                    className="card-img-top"
                    style={{
                      height: "300px",
                      objectFit: "cover",
                      borderTopLeftRadius: "1rem",
                      borderTopRightRadius: "1rem",
                    }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{item.name || "Unnamed Service"}</h5>
                    <p className="card-text mb-1">
                      <strong>Quantity:</strong>{" "}
                      {typeof item.quantity === "number" ? item.quantity : 0}
                    </p>
                    <p className="card-text mb-0">
                      <strong>Price:</strong>{" "}
                      ${typeof item.unitPrice === "number" ? item.unitPrice.toFixed(2) : "0.00"} USD
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <h5 className="fw-bold text-success">
              💰 Total Paid: ${total.toFixed(2)} USD
            </h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaypalSuccess;
