export const errorChecks = (message) => {
  let msg = message;
  
  if (msg.includes("auth/user-not-found")) {
    msg = "User not found";
  } else if (msg.includes("auth/invalid-credential")) {
    msg = "Incorrect password or email address";
  } else if (msg.includes("auth/email-already-in-use")) {
    msg = "Email already in use";
  } else if (msg.includes("auth/invalid-email")) {
    msg = "Invalid email. Please use a valid email address";
  } else if (msg.includes("auth/weak-password")) {
    msg = "Weak password";
  } else {
    msg = "An error occurred. Please try again later.";
  }

  return msg;
};
