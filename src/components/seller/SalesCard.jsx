//shows seller statistics
// Example:

// Total Sales
// ₹85,000
function SalesCard({ title, value }) {
  return (
    <article className="rounded-xl border bg-white p-5">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold">
        {value}
      </p>
    </article>
  );
}

export default SalesCard;