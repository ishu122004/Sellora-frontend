import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase/firebaseConfig";
import api from "./services/api";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startupError, setStartupError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        setStartupError("");

        try {
          if (!currentUser) {
            setUser(null);
            setRole(null);
            return;
          }

          setUser(currentUser);

          const res = await api.post(
            "/users",
            {
              firebaseUid: currentUser.uid,
              name: currentUser.displayName || "",
              email: currentUser.email || "",
              phone: currentUser.phoneNumber || "",
              role: "customer"
            }
          );

          setRole(res.data.role);
        } catch (error) {
          console.error("User API error:", error.message);
          setRole(null);
          setStartupError(
            error.response?.data?.message ||
            "The API server is unavailable. Start the backend and try again."
          );
        } finally {
          setLoading(false);
        }
      }
    );

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        Loading...
      </main>
    );
  }

  if (startupError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <section className="w-full max-w-md rounded-lg border border-red-200 bg-white p-6 text-center shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">
            Unable to connect
          </h1>
          <p className="mt-3 text-sm text-red-600">
            {startupError}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-lg bg-black px-5 py-3 font-medium text-white"
          >
            Try again
          </button>
        </section>
      </main>
    );
  }

  return (
    <AppRoutes
      user={user}
      role={role}
    />
  );
}
