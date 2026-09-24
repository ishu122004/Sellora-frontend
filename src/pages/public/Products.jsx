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

  const { products, loading, error } = useSelector(
    (state) => state.product
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    dispatch(fetchproducts());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      result = result.filter(
        (product) => product.category === category
      );
    }

    if (sort === "priceLow") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "priceHigh") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    return result;
  }, [products, search, category, sort]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-8">
        <p>Loading products...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 md:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-sm font-medium text-purple-600">
            MarketHub
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Explore Products
          </h1>

          <p className="mt-2 text-gray-500">
            Products from all our sellers.
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <ProductSearch
            search={search}
            setSearch={setSearch}
          />

          <ProductFilter
            products={products}
            category={category}
            setCategory={setCategory}
          />

          <ProductSort
            sort={sort}
            setSort={setSort}
          />
        </div>

        {error && (
          <p className="mb-5 text-red-600">
            {error}
          </p>
        )}

        <ProductGrid products={filteredProducts} />
      </section>
    </main>
  );
}

export default Products;