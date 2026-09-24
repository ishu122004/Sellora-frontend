//user create a new password using reset token
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  verifyPasswordResetCode,
  confirmPasswordReset
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const oobCode = searchParams.get("oobCode");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!oobCode) {
      setError("Invalid or expired reset link.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await verifyPasswordResetCode(auth, oobCode);

      await confirmPasswordReset(
        auth,
        oobCode,
        password
      );

      setMessage("Password updated successfully.");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <section className="w-full max-w-md border border-gray-200 rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">
          Create new password
        </h1>

        <p className="mt-2 text-gray-500">
          Enter your new password below.
        </p>

        <form onSubmit={handleReset} className="mt-6 space-y-4">
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white rounded-lg py-3 font-medium hover:bg-purple-700"
          >
            Update Password
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-green-600">
            {message}
          </p>
        )}

        {error && (
          <p className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}
      </section>
    </main>
  );
}

export default ResetPassword;