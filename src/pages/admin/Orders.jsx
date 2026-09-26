//admin see all order
import { useEffect, useState } from "react";
import api from "../../services/api";
import DataTable from "../../components/admin/DataTable";
import OrderStatus from "../../components/order/OrderStatus";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/admin/orders")
      .then((res) => setOrders(res.data))
      .catch(console.error);
  }, []);

  const columns = [
    {
      key: "_id",
      label: "Order ID",
      render: (order) => order._id.slice(-8)
    },
    {
      key: "customerId",
      label: "Customer"
    },
    {
      key: "totalAmount",
      label: "Amount",
      render: (order) => `₹${order.totalAmount}`
    },
    {
      key: "status",
      label: "Status",
      render: (order) => (
        <OrderStatus status={order.status} />
      )
    },
    {
      key: "createdAt",
      label: "Date",
      render: (order) =>
        new Date(order.createdAt).toLocaleDateString()
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold">
        Orders
      </h1>

      <div className="mt-8">
        <DataTable
          columns={columns}
          data={orders}
        />
      </div>
    </main>
  );
}

export default Orders;