//Reusable popup
//Example: Are you sure you want to delete this product?
// Cancel    Delete
export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <section className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <header className="flex items-center justify-between border-b border-gray-200 pb-4">
          <h2 className="text-lg font-semibold">{title}</h2>

          <button
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-black"
          >
            ×
          </button>
        </header>

        <div className="pt-5">{children}</div>
      </section>
    </div>
  );
}