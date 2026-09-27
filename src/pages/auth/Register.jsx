import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import api from "../../services/api";
import { getAuthErrorMessage } from "../../firebase/authErrors";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [phone, setPhone] = useState("");
  // const [otp, setOtp] = useState("");
  // const [confirmation, setConfirmation] = useState(null);
  const [role, setRole] = useState("customer");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = result.user;

      await api.post("/users", {
        firebaseUid: user.uid,
        email: user.email,
        role
      });

      navigate("/");
    } catch (error) {
      setError(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      setError("");
      setLoading(true);

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      await api.post("/users", {
        firebaseUid: user.uid,
        email: user.email,
        role
      });

      navigate("/");
    } catch (error) {
      setError(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  // const sendOtp = async () => {
  //   try {
  //     setError("");

  //     if (!phone) {
  //       setError("Enter your phone number");
  //       return;
  //     }

  //     if (!window.recaptchaVerifier) {
  //       window.recaptchaVerifier = new RecaptchaVerifier(
  //         auth,
  //         "recaptcha-container",
  //         {
  //           size: "normal"
  //         }
  //       );
  //     }

  //     const result = await signInWithPhoneNumber(
  //       auth,
  //       phone,
  //       window.recaptchaVerifier
  //     );

  //     setConfirmation(result);
  //     alert("OTP sent");
  //   } catch (error) {
  //     setError(getAuthErrorMessage(error));
  //   }
  // };

  // const verifyOtp = async () => {
  //   try {
  //     setError("");
  //     setLoading(true);

  //     if (!confirmation) {
  //       setError("Please request OTP first");
  //       return;
  //     }

  //     const result = await confirmation.confirm(otp);

  //     const user = result.user;

  //     await api.post("/users", {
  //       firebaseUid: user.uid,
  //       phone: user.phoneNumber,
  //       role
  //     });

  //     navigate("/");
  //   } catch (error) {
  //     setError(getAuthErrorMessage(error));
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-md border border-gray-200 rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">
          Create account
        </h1>

        <p className="mt-2 text-gray-500">
          Join Sellora
        </p>

        {error && (
          <p className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="mt-6">
          <p className="mb-3 text-sm font-medium text-gray-700">
            Account type
          </p>

          <div className="grid grid-cols-2 gap-3">
            <label
              className={`cursor-pointer rounded-lg border p-4 ${
                role === "customer"
                  ? "border-purple-600 bg-purple-50"
                  : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="role"
                value="customer"
                checked={role === "customer"}
                onChange={(e) => setRole(e.target.value)}
                className="mr-2"
              />

              <span className="font-medium">
                Customer
              </span>

              <p className="mt-1 text-xs text-gray-500">
                Shop products
              </p>
            </label>

            <label
              className={`cursor-pointer rounded-lg border p-4 ${
                role === "seller"
                  ? "border-purple-600 bg-purple-50"
                  : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="role"
                value="seller"
                checked={role === "seller"}
                onChange={(e) => setRole(e.target.value)}
                className="mr-2"
              />

              <span className="font-medium">
                Seller
              </span>

              <p className="mt-1 text-xs text-gray-500">
                Sell products
              </p>
            </label>
          </div>
        </div>

        <form
          onSubmit={handleRegister}
          className="mt-6 space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white rounded-lg py-3 font-medium hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Register with Email"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-gray-200"></span>
          <span className="text-sm text-gray-400">
            OR
          </span>
          <span className="h-px flex-1 bg-gray-200"></span>
        </div>

        <button
          type="button"
          onClick={handleGoogleRegister}
          disabled={loading}
          className="w-full border border-gray-300 text-gray-900 rounded-lg py-3 font-medium hover:bg-gray-50 disabled:opacity-50"
        >
          Continue with Google
        </button>

        {/* <div className="my-6 border-t border-gray-200 pt-6">
          <h2 className="font-semibold text-gray-900">
            Register with phone
          </h2>

          <div className="mt-4 space-y-3">
            <input
              type="tel"
              placeholder="+919876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div id="recaptcha-container"></div>

            {!confirmation ? (
              <button
                type="button"
                onClick={sendOtp}
                disabled={loading}
                className="w-full border border-purple-600 text-purple-600 rounded-lg py-3 font-medium hover:bg-purple-50 disabled:opacity-50"
              >
                Send OTP
              </button>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                />

                <button
                  type="button"
                  onClick={verifyOtp}
                  disabled={loading}
                  className="w-full bg-purple-600 text-white rounded-lg py-3 font-medium hover:bg-purple-700 disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </>
            )}
          </div>
        </div> */}

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-purple-600 hover:text-purple-700"
          >
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Register;