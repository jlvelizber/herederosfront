import { FC, ReactNode, useState } from "react";
import { AuthContext } from "../contexts";

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<
    "checking" | "authenticated" | "no-authenticated"
  >("checking");

  const doLogin = () => {
    setStatus("authenticated");
  };
  const doLogout = () => {
    localStorage.clear();
    setStatus("no-authenticated");
  };
  const doCheking = () => {
    setStatus("checking");
  };

  return (
    <AuthContext.Provider value={{ status, doLogin, doLogout, doCheking }}>
      {children}
    </AuthContext.Provider>
  );
};
