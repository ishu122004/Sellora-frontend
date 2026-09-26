import { useState } from "react";
import SafeImage from "../common/SafeImage";
import { PRODUCT_CATEGORIES } from "../../utils/constants";

const emptyForm = {
  name: "",
  category: "",
  price: "",
  stock: "",
  description: "",
  imageUrls: "",
  sellerId: ""
};

const getInitialForm = (product) => {
  if (!product) {
    return emptyForm;
  }

  const images = product.images?.length
    ? product.images
    : product.image
      ? [product.image]
      : [];

  return {
    name: product.name || "",
    category: product.category || "",
    price: product.price ?? "",
    stock: product.stock ?? "",
    description: product.description || "",
    imageUrls: images.join("\n"),
    sellerId: product.sellerId || ""
  };
};

function ProductForm({
  product,
  onSubmit,
  loading = false,
  sellers = [],
  requireSeller = false
}) {
  const [form, setForm] = useState(() =>
    getInitialForm(product)
  );
  const [error, setError] = useState("");

  const images = form.imageUrls
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 6);

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const price = Number(form.price);
    const stock = Number(form.stock);

    if (!Number.isFinite(price) || price < 0) {
      setError("Enter a valid price.");
      return;
    }

    if (!Number.isInteger(stock) || stock < 0) {
      setError("Stock must be a whole number.");
      return;
    }

    if (requireSeller && !form.sellerId) {
      setError("Select a seller.");
      return;
    }

    setError("");
    onSubmit({
      name: form.name.trim(),
      category: form.category,
      price,
      stock,
      description: form.description.trim(),
      images,
      sellerId: form.sellerId || undefined
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-lg border border-slate-200 bg-white p-6"
    >
      {requireSeller ? (
        <div>
          <label className="mb-2 block text-sm font-medium">
            Seller
          </label>
          <select
            name="sellerId"
            value={form.sellerId}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3"
          >
            <option value="">Select seller</option>
            {sellers.map((seller) => (
              <option
                key={seller.firebaseUid}
                value={seller.firebaseUid}
              >
                {seller.store?.storeName ||
                  seller.name ||
                  seller.email}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Product name
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Category
        </label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
        >
          <option value="">Select category</option>
          {PRODUCT_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Price
          </label>
          <input
            name="price"
            type="number"
            min="0"
            step="1"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Stock
          </label>
          <input
            name="stock"
            type="number"
            min="0"
            step="1"
            value={form.stock}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Image URLs
        </label>
        <textarea
          name="imageUrls"
          value={form.imageUrls}
          onChange={handleChange}
          rows="4"
          placeholder={"One image URL per line\nUp to 6 images"}
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
        />
        <p className="mt-1 text-xs text-slate-500">
          Broken links automatically show a safe placeholder.
        </p>
      </div>

      {images.length ? (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {images.map((image, index) => (
            <SafeImage
              key={image}
              src={image}
              alt={"Product preview " + (index + 1)}
              className="aspect-square w-full rounded object-cover"
              fallbackClassName="aspect-square w-full rounded"
            />
          ))}
        </div>
      ) : null}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          rows="6"
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
        />
      </div>

      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-purple-600 py-3 font-medium text-white disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : product
            ? "Update product"
            : "Add product"}
      </button>
    </form>
  );
}

export default ProductForm;
