//reusable table for admin data .Example:
// User       Email          Role
// Iswarya    ...            Customer
// karthika       ...            Seller
function DataTable({ columns, data }) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table className="w-full text-left">
        <thead className="border-b bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-5 py-4 text-sm font-semibold"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={row._id || index} className="border-b">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-5 py-4 text-sm"
                >
                  {column.render
                    ? column.render(row)
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;