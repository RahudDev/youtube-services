import React, { useEffect, useState } from "react";
import { API } from "../App";

type PurchasedItem = {
  name: string;
  quantity: number;
};

type Order = {
  orderID: string;
  paypalOrderID: string;
  createdAt: string;
  status: string;
  totalAmount: string;
  purchasedItems: PurchasedItem[];
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Delivered":
      return <span className="badge bg-success px-3 py-2 rounded-pill">Delivered</span>;
    case "Shipped":
      return <span className="badge bg-primary px-3 py-2 rounded-pill">Shipped</span>;
    case "Pending":
      return <span className="badge bg-warning text-dark px-3 py-2 rounded-pill">Pending</span>;
    case "Cancelled":
      return <span className="badge bg-danger px-3 py-2 rounded-pill">Cancelled</span>;
    default:
      return <span className="badge bg-secondary px-3 py-2 rounded-pill">{status}</span>;
  }
};

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const email = user?.email;

    if (!email) {
      setLoading(false);
      return;
    }

    fetch(`${API}/api/history/order-history/${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.orders)) {
          setOrders(data.orders);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching order history:", err);
        setLoading(false);
      });
  }, []);

 const filteredOrders = orders.filter((order) => {
  const purchasedItemNames = order.purchasedItems.map(item => item.name).join(" ");
  return `${order.orderID} ${order.status} ${order.createdAt} ${purchasedItemNames}`
    .toLowerCase()
    .includes(search.toLowerCase());
});


  const toggleExpand = (orderID: string) => {
    setExpandedOrderId((prev) => (prev === orderID ? null : orderID));
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-lg border-0">
            <div
              className="card-header text-white text-center py-4"
              style={{
                background: "linear-gradient(90deg, #4e54c8, #8f94fb)",
                borderTopLeftRadius: "0.5rem",
                borderTopRightRadius: "0.5rem",
              }}
            >
              <h2 className="fw-bold mb-0">🛒 Your Order History</h2>
              <p className="mb-0 small">Track your previous purchases easily</p>
            </div>

            <div className="card-body p-4">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="🔍 Search by ID, status, or date..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>Order ID</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((order) => (
                          <React.Fragment key={order.orderID}>
                            <tr
                              className="border-bottom"
                              style={{ cursor: "pointer" }}
                              onClick={() => toggleExpand(order.orderID)}
                            >
                              <td className="fw-medium text-monospace">{order.orderID}</td>
                              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                              <td>{getStatusBadge(order.status)}</td>
                              <td className="fw-bold">${order.totalAmount}</td>
                            </tr>
                            {expandedOrderId === order.orderID && (
                              <tr>
                                <td colSpan={4}>
                                  <div className="bg-light p-3 rounded">
                                    <h6 className="mb-2 text-muted">🧾 Purchased Items</h6>
                                    <ul className="list-group">
                                      {order.purchasedItems.map((item, index) => (
                                        <li
                                          key={index}
                                          className="list-group-item d-flex justify-content-between"
                                        >
                                          <span>{item.name}</span>
                                          <span className="badge bg-secondary">
                                            Qty: {item.quantity}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {filteredOrders.length === 0 && (
                    <div className="alert alert-warning text-center mt-4">
                      No matching orders found.
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
