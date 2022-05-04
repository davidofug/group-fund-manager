import React from "react";
const AuthContext = React.createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const values = {
    user,
    setUser,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
export { AuthContext, AuthProvider };
