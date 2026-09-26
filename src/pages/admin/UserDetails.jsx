//details of a particular user
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get(`/admin/users/${id}`)
      .then((res) => setUser(res.data))
      .catch(console.error);
  }, [id]);

  if (!user) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="rounded-xl border bg-white p-6">
        <h1 className="text-2xl font-bold">
          User Details
        </h1>

        <p className="mt-5">Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone || "Not provided"}</p>
        <p>Role: {user.role}</p>
      </div>
    </main>
  );
}

export default UserDetails;