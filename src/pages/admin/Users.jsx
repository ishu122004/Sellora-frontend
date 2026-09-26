//admin see all users
import { useEffect, useState } from "react";
import api from "../../services/api";
import DataTable from "../../components/admin/DataTable";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await api.get("/admin/users");
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    {
      key: "createdAt",
      label: "Created",
      render: (user) =>
        new Date(user.createdAt).toLocaleDateString()
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold">
        Users
      </h1>

      <div className="mt-8">
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <DataTable
            columns={columns}
            data={users}
          />
        )}
      </div>
    </main>
  );
}

export default Users;