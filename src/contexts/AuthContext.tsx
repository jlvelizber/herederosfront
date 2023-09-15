import { createContext } from "react";
import { AuthStateContextInterface } from "../interfaces";

export const AuthContext = createContext<AuthStateContextInterface | null>(
  null
);
