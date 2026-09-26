import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-purple-600">
              Welcome to Sellora
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
              Everything you need, all in one marketplace.
            </h1>

            <p className="mt-6 max-w-xl text-gray-600 leading-7">
              Discover quality products from different sellers and shop
              easily from one place.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                to="/products"
                className="rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-purple-600"
              >
                Shop Products
              </Link>

              <Link
                to="/categories"
                className="rounded-lg border border-gray-300 px-6 py-3 font-medium hover:border-purple-600 hover:text-purple-600"
              >
                Browse Categories
              </Link>
            </div>
          </div>

          <div className="flex min-h-80 items-center justify-center rounded-2xl bg-purple-50">
            <div className="text-center">
              <p className="text-6xl">🛍️</p>
              <h2 className="mt-4 text-2xl font-bold text-gray-900">
               Sellora
              </h2>
              <p className="mt-2 text-gray-500">
                Shop. Sell. Discover.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-12 md:grid-cols-3">
          <div className="rounded-xl border p-6">
            <h3 className="font-semibold">Wide Product Selection</h3>
            <p className="mt-2 text-sm text-gray-500">
              Explore products across different categories.
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <h3 className="font-semibold">Multiple Sellers</h3>
            <p className="mt-2 text-sm text-gray-500">
              Discover products from different sellers.
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <h3 className="font-semibold">Easy Shopping</h3>
            <p className="mt-2 text-sm text-gray-500">
              Add products to cart and manage your orders easily.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;