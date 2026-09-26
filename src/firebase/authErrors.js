const AUTH_ERROR_MESSAGES = {
  "auth/invalid-credential":
    "Incorrect email or password. Check your details or create an account first.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/missing-password": "Enter your password.",
  "auth/weak-password": "Use a password with at least 6 characters.",
  "auth/email-already-in-use":
    "An account already exists for this email. Try logging in instead.",
  "auth/popup-closed-by-user": "Google sign-in was cancelled.",
  "auth/popup-blocked": "Allow pop-ups in your browser to sign in with Google.",
  "auth/operation-not-allowed":
    "This sign-in method is not enabled for the Firebase project.",
  "auth/too-many-requests":
    "Too many attempts. Wait a few minutes and try again.",
  "auth/network-request-failed":
    "Could not reach Firebase. Check your internet connection and try again.",
  "auth/invalid-phone-number":
    "Enter a valid phone number including the country code, for example +919876543210.",
  "auth/invalid-verification-code": "The OTP is incorrect or has expired.",
  "auth/quota-exceeded": "The SMS quota has been reached. Try again later."
};

export const getAuthErrorMessage = (error) =>
  error?.response?.data?.message ||
  AUTH_ERROR_MESSAGES[error?.code] ||
  "Authentication failed. Please try again.";
