import { useContext } from "react";
import {
  LoginFormInterface,
  AuthUserInterface,
  AuthStateContextInterface,
} from "../interfaces";
import { AxiosResponse } from "axios";
import { RegisterApi } from "../api/RegisterApi";
import { AuthContext } from "../contexts";
export const useAuth = () => {
  const { doLogin, doLogout, doCheking } = useContext(
    AuthContext
  ) as AuthStateContextInterface;

  const startLogin = async ({ email, password }: LoginFormInterface) => {
    doCheking();

    try {
      const { data }: AxiosResponse<AuthUserInterface> = await RegisterApi.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", data?.token as string);
      localStorage.setItem("token-init-time", new Date().getTime().toString());

      doLogin();
    } catch (error) {
      console.error(error);
      localStorage.clear();
      doLogout();
      // setAuth({ status: "no-authenticated" });
    }
  };

  const checkAuthToken = async () => {
    const token: string | null = localStorage.getItem("token");
    if (!token) return doLogout();

    try {
      const { data } = await RegisterApi.post("auth/revalidate");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-time", new Date().getTime().toString());

      doLogin();
    } catch (error) {
      localStorage.clear();
      doLogout();
    }
  };

  return {
    startLogin,
    checkAuthToken,
    // auth,
  };
};
