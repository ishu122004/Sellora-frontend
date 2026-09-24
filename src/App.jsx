//main react app component.usually it connects your app to routes
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import api from "./services/api";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Firebase user:", currentUser);

      if (!currentUser) {
        setUser(null);
        setRole(null);
        setLoading(false);
        return;
      }

      setUser(currentUser);
      console.log("Firebase UID:", currentUser.uid);

      try {
        const res = await api.get(`/users/${currentUser.uid}`);

        console.log("Backend user data:", res.data);
        console.log("Role:", res.data.role);

        setRole(res.data.role);
      } catch (error) {
        console.log("User API error:", error.message);
        setRole(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <AppRoutes user={user} role={role} />;
}