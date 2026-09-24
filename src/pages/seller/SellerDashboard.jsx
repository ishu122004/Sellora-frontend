//seller overview
function SellerDashboard() {
  const stats = [
    { title: "Total Products", value: "48" },
    { title: "Total Orders", value: "126" },
    { title: "Total Sales", value: "₹2,85,000" },
    { title: "Pending Orders", value: "12" }
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div>
          <p className="text-purple-600 font-medium">Seller Panel</p>
          <h1 className="text-3xl font-bold text-black mt-1">
            Seller Dashboard
          </h1>
          <p className="text-gray-500 mt-2">
            Manage your products, orders and sales.
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
          <h2 className="text-xl font-bold text-black">
            Sales Overview
          </h2>

          <div className="mt-6 h-48 border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">
              Sales chart will be added later
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default SellerDashboard;