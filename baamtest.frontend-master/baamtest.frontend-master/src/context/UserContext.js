import React from "react";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    case "LOGIN_ADMIN":
      return { ...state, isAdmin: true };
    case "SIGN_OUT_ADMIN":
      return { ...state, isAdmin: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("userToken"),
    isAdmin: !!localStorage.getItem("isAdmin"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export {
  UserProvider,
  useUserState,
  useUserDispatch,
  loginUser,
  signOut,
  adminSignOut,
};

// ###########################################################

function loginUser(
  dispatch,
  userToken,
  userType,
  userId,
  history,
  setIsLoading,
  setError,
  isAdmin,
) {
  setError(false);
  setIsLoading(true);

  if (userToken) {
    // setTimeout(() => {
    localStorage.setItem("userToken", userToken);
    localStorage.setItem("userType", userType);
    localStorage.setItem("userId", userId);
    setError(null);
    setIsLoading(false);
    if (isAdmin) {
      localStorage.setItem("isAdmin", "true");
      dispatch({ type: "LOGIN_ADMIN" });
      dispatch({ type: "LOGIN_SUCCESS" });
      history.push("/admin/pishkhan");
    } else {
      dispatch({ type: "LOGIN_SUCCESS" });
      history.replace("/dashboard/pishkhan");
    }
    // }, 500);
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/home");
  localStorage.clear();
}

function adminSignOut(dispatch, history) {
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  dispatch({ type: "SIGN_OUT_ADMIN" });
  history.push("/home");
  localStorage.clear();
}
