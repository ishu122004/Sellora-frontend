//existing user login
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { getAuthErrorMessage } from "../../firebase/authErrors";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [phone, setPhone] = useState("");
  // const [otp, setOtp] = useState("");
  // const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      navigate("/");
    } catch (error) {
      setError(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError("");
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
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
  //     const result = await confirmation.confirm(otp);

  //     if (result.user) {
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     setError(getAuthErrorMessage(error));
  //   }
  // };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-md border border-gray-200 rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back
        </h1>

        <p className="mt-2 text-gray-500">
          Login to Sellora
        </p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white rounded-lg py-3 font-medium hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login with Email"}
          </button>
        </form>

        <a
          href="/forgot-password"
          className="block mt-3 text-sm text-purple-600 hover:underline"
        >
          Forgot password?
        </a>

        <p className="mt-4 text-sm text-gray-500">
  Don't have an account?{" "}
  <button
    type="button"
    onClick={() => navigate("/register")}
    className="font-medium text-purple-600 hover:underline"
  >
    Create account
  </button>
</p>

        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-gray-200"></span>
          <span className="text-sm text-gray-400">OR</span>
          <span className="h-px flex-1 bg-gray-200"></span>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full border border-gray-300 text-gray-900 rounded-lg py-3 font-medium hover:bg-gray-50"
        >
          Continue with Google
        </button>

        {/* <div className="my-6 border-t border-gray-200 pt-6">
          <h2 className="font-semibold text-gray-900">
            Login with phone
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
                className="w-full border border-purple-600 text-purple-600 rounded-lg py-3 font-medium hover:bg-purple-50"
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
                  className="w-full bg-purple-600 text-white rounded-lg py-3 font-medium hover:bg-purple-700"
                >
                  Verify OTP
                </button>
              </>
            )}
          </div> */}
        {/* </div> */}

        {error && (
          <p className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}
      </section>
    </main>
  );
}

export default Login;