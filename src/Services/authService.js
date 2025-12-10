import { auth, googleProvider } from "../Config/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

export const loginWithEmail = async (email, password) => {
  try {
    if (!email || !password) throw new Error("Email and password are required");
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (!userCredential?.user) throw new Error("No user found after sign in");
    return userCredential.user;
  } catch (error) {
    let msg = "Login failed";
    switch (error.code) {
      case "auth/invalid-email":
        msg = "Invalid email address";
        break;
      case "auth/user-disabled":
        msg = "This account has been disabled";
        break;
      case "auth/user-not-found":
        msg = "No account found with this email";
        break;
      case "auth/wrong-password":
        msg = "Incorrect password";
        break;
      default:
        msg = error.message || msg;
    }
    throw new Error(msg);
  }
};

export const registerWithEmail = async (email, password, displayName) => {
  try {
    if (!email || !password) throw new Error("Email and password are required");
    if (password.length < 6) throw new Error("Password must be at least 6 characters");
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (!userCredential?.user) throw new Error("No user found after registration");
    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
    }
    return userCredential.user;
  } catch (error) {
    let msg = "Registration failed";
    switch (error.code) {
      case "auth/email-already-in-use":
        msg = "Email already in use";
        break;
      case "auth/invalid-email":
        msg = "Invalid email address";
        break;
      case "auth/operation-not-allowed":
        msg = "Email/password accounts are not enabled";
        break;
      case "auth/weak-password":
        msg = "Password is too weak";
        break;
      default:
        msg = error.message || msg;
    }
    throw new Error(msg);
  }
};

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    if (!result?.user) throw new Error("No user found after Google sign in");
    return result.user;
  } catch (error) {
    let msg = "Google sign in failed";
    switch (error.code) {
      case "auth/account-exists-with-different-credential":
        msg = "Account already exists with different credential";
        break;
      case "auth/popup-closed-by-user":
        msg = "Sign in popup was closed";
        break;
      default:
        msg = error.message || msg;
    }
    throw new Error(msg);
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error("Logout failed: " + (error.message || "Unknown error"));
  }
};

export const getCurrentUser = () => {
  try {
    return auth.currentUser || null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};
