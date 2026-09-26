//display statistics Example:
// Total Users
// 1,250
// Another:
// Total Products
// 850
function StatsCard({ title, value }) {
  return (
    <article className="rounded-xl border bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>
    </article>
  );
}

export default StatsCard;