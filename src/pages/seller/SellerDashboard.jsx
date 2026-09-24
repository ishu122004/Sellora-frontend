//seller overview
import { Link } from "react-router-dom";

function SellerDashboard() {
  const cards = [
    ["Products", "/seller/products"],
    ["Orders", "/seller/orders"],
    ["Sales", "/seller/sales"],
    ["Reviews", "/seller/reviews"]
  ];

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">
          Seller Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your MarketHub store.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(([title, path]) => (
            <Link
              key={path}
              to={path}
              className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md"
            >
              <h2 className="text-xl font-semibold">
                {title}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Manage {title.toLowerCase()}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default SellerDashboard;