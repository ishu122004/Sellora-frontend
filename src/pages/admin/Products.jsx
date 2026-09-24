//admin manages all marketpolace products
function Products() {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: "₹1,999",
      stock: 24
    },
    {
      id: 2,
      name: "Smart Watch",
      category: "Electronics",
      price: "₹2,999",
      stock: 15
    },
    {
      id: 3,
      name: "Running Shoes",
      category: "Fashion",
      price: "₹2,499",
      stock: 32
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-purple-600 font-medium">Admin Panel</p>
            <h1 className="text-3xl font-bold text-black mt-1">
              Products
            </h1>
          </div>

          <button className="bg-purple-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-purple-700">
            Add Product
          </button>
        </div>

        <section className="bg-white border border-gray-200 rounded-xl mt-8 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr className="border-b">
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b last:border-0">
                    <td className="px-6 py-4 font-medium text-black">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4">{product.price}</td>
                    <td className="px-6 py-4">{product.stock}</td>
                    <td className="px-6 py-4">
                      <button className="text-purple-600 font-medium mr-4">
                        Edit
                      </button>
                      <button className="text-red-500 font-medium">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Products;