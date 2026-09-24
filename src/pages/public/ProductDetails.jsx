//show one complete product
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

export default function ProductDetails() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-12 md:grid-cols-2">
          <section className="flex min-h-112.5 items-center justify-center rounded-2xl bg-gray-100">
            <span className="text-gray-400">Product Image</span>
          </section>

          <article className="py-4">
            <p className="text-sm font-semibold text-purple-600">Electronics</p>

            <h1 className="mt-3 text-4xl font-bold">
              Wireless Headphones
            </h1>

            <p className="mt-5 text-3xl font-bold text-purple-600">
              ₹2,499
            </p>

            <p className="mt-6 leading-7 text-gray-600">
              High-quality wireless headphones with comfortable design,
              clear sound, and long battery life.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="rounded-lg bg-purple-600 px-6 py-3 font-medium text-white hover:bg-purple-700">
                Add to Cart
              </button>

              <button className="rounded-lg border border-gray-300 px-6 py-3 font-medium hover:border-purple-600 hover:text-purple-600">
                Add to Wishlist
              </button>
            </div>

            <section className="mt-10 border-t border-gray-200 pt-6">
              <h2 className="font-semibold">Seller Information</h2>
              <p className="mt-2 text-gray-600">MarketHub Seller</p>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}