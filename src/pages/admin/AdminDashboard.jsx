//overall market place statistics
function AdminDashboard() {
  const stats = [
    { title: "Total Users", value: "1,248" },
    { title: "Total Sellers", value: "86" },
    { title: "Total Orders", value: "3,420" },
    { title: "Revenue", value: "₹8,45,000" }
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div>
          <p className="text-purple-600 font-medium">Admin Panel</p>
          <h1 className="text-3xl font-bold text-black mt-1">Dashboard</h1>
          <p className="text-gray-500 mt-2">
            Manage your marketplace from one place.
          </p>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          {stats.map((item) => (
            <article
              key={item.title}
              className="bg-white border border-gray-200 rounded-xl p-6"
            >
              <p className="text-sm text-gray-500">{item.title}</p>
              <h2 className="text-2xl font-bold text-black mt-2">
                {item.value}
              </h2>
            </article>
          ))}
        </section>

        <section className="bg-white border border-gray-200 rounded-xl p-6 mt-8">
          <h2 className="text-xl font-bold text-black">Recent Orders</h2>

          <div className="overflow-x-auto mt-5">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-sm text-gray-500">
                  <th className="py-3">Order</th>
                  <th className="py-3">Customer</th>
                  <th className="py-3">Amount</th>
                  <th className="py-3">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="py-4">#ORD1001</td>
                  <td className="py-4">Iswarya</td>
                  <td className="py-4">₹2,499</td>
                  <td className="py-4">
                    <span className="text-purple-600 font-medium">
                      Pending
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4">#ORD1002</td>
                  <td className="py-4">Priya</td>
                  <td className="py-4">₹1,999</td>
                  <td className="py-4">
                    <span className="text-green-600 font-medium">
                      Delivered
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AdminDashboard;