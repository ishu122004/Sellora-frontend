//show all products
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchproducts } from "../../redux/slices/productSlice";
import ProductGrid from "../../components/product/ProductGrid";
import ProductSearch from "../../components/product/ProductSearch";
import ProductFilter from "../../components/product/ProductFilter";
import ProductSort from "../../components/product/ProductSort";

function Products() {
  const dispatch = useDispatch();

  const {
    products,
    loading,
    error
  } = useSelector((state) => state.product);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    dispatch(fetchproducts());
  }, [dispatch]);

  const categories = [
    "All",
    ...new Set(
      products.map((product) => product.category)
    )
  ];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const value = search.toLowerCase();

      result = result.filter((product) =>
        product.name.toLowerCase().includes(value)
      );
    }

    if (category !== "All") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "name") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    if (sort === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );
    }

    return result;
  }, [products, search, category, sort]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 md:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-3xl bg-black p-7 text-white md:p-10">
          <p className="text-sm font-medium text-purple-300">
            Sellora
          </p>

          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Explore Products
          </h1>

          <p className="mt-3 text-slate-300">
            Discover products from all our sellers.
          </p>
        </div>

        <section className="mt-7 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 md:p-6">
          <div className="grid gap-5 lg:grid-cols-4">
            <ProductSearch
              search={search}
              setSearch={setSearch}
            />

            <ProductFilter
              categories={categories}
              category={category}
              setCategory={setCategory}
            />

            <ProductSort
              sort={sort}
              setSort={setSort}
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
            <p className="text-sm text-slate-500">
              {filteredProducts.length} products found
            </p>

            {(search || category !== "All" || sort !== "default") && (
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setSort("default");
                }}
                className="text-sm font-medium text-purple-600"
              >
                Clear filters
              </button>
            )}
          </div>
        </section>

        {loading && (
          <p className="py-10 text-center text-slate-500">
            Loading products...
          </p>
        )}

        {error && (
          <p className="mt-6 rounded-xl bg-red-50 p-4 text-red-600">
            {error}
          </p>
        )}

        {!loading && (
          <div className="mt-8">
            <ProductGrid products={filteredProducts} />
          </div>
        )}
      </section>
    </main>
  );
}

export default Products;