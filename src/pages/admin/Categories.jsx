//admin creates/updates/deletes categories
import { useEffect, useState } from "react";
import api from "../../services/api";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const loadCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCategories().catch(console.error);
  }, []);

  const addCategory = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      await api.post("/categories", { name });
      setName("");
      loadCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await api.delete(`/categories/${id}`);
      loadCategories();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold">
        Categories
      </h1>

      <form
        onSubmit={addCategory}
        className="mt-8 flex gap-3"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          className="rounded-lg border px-4 py-3"
        />

        <button className="rounded-lg bg-purple-600 px-5 py-3 text-white">
          Add
        </button>
      </form>

      <div className="mt-8 space-y-3">
        {categories.map((category) => (
          <div
            key={category._id}
            className="flex justify-between rounded-lg border bg-white p-4"
          >
            <span>{category.name}</span>

            <button
              onClick={() => deleteCategory(category._id)}
              className="text-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Categories;