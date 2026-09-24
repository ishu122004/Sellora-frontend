//display all categories
import { Link } from "react-router-dom";

const categories = [
  "Electronics",
  "Fashion",
  "Beauty",
  "Home",
  "Books",
  "Sports"
];

function Categories() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">Categories</h1>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/categories/${category}`}
              className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h2 className="text-xl font-semibold">
                {category}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Explore {category} products
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Categories;