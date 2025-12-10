import { toast } from "react-toastify";
import {
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  logoutUser,
} from "../../Services/authService";
import { auth } from "../../Config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const AUTH_STATE_CHANGED = "AUTH_STATE_CHANGED";

const storeUser = (user) => {
  if (user) {
    const minimalUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || "",
    };
    localStorage.setItem("authUser", JSON.stringify(minimalUser));
    return minimalUser;
  } else {
    localStorage.removeItem("authUser");
    return null;
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const user = await loginWithEmail(email, password);
    const minimalUser = storeUser(user);
    dispatch({ type: LOGIN_SUCCESS, payload: minimalUser });
    toast.success("Logged in successfully!");
    return minimalUser;
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
    toast.error(error.message);
    throw error;
  }
};

export const register = (email, password, displayName) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const user = await registerWithEmail(email, password, displayName);
    const minimalUser = storeUser(user);
    dispatch({ type: REGISTER_SUCCESS, payload: minimalUser });
    toast.success("Registration successful!");
    return minimalUser;
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
    toast.error(error.message);
    throw error;
  }
};

export const googleSignIn = () => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const user = await loginWithGoogle();
    const minimalUser = storeUser(user);
    dispatch({ type: LOGIN_SUCCESS, payload: minimalUser });
    toast.success("Logged in with Google successfully!");
    return minimalUser;
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
    toast.error(error.message);
    throw error;
  }
};

export const logout = () => async (dispatch) => {
  try {
    await logoutUser();
    storeUser(null);
    dispatch({ type: LOGOUT });
    toast.success("Logged out successfully!");
  } catch (error) {
    toast.error(error.message || "Logout failed");
    throw error;
  }
};

// export const initAuthListener = () => (dispatch) => {
//   onAuthStateChanged(auth, (user) => {
//     const minimalUser = storeUser(user);
//     if (minimalUser) {
//       dispatch({ type: AUTH_STATE_CHANGED, payload: minimalUser });
//     } else {
//       dispatch({ type: LOGOUT });
//     }
//   });
// };

export const initAuthListener = () => (dispatch) => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: LOGIN_SUCCESS, payload: user });
      } else {
        dispatch({ type: LOGOUT });
      }
      resolve();  // resolve the promise after auth state set
    });
  });
};
