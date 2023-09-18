import { createContext } from "react";
import { RegisterKidAppInterfaceContext } from "../interfaces";

export const RegisterKidAppContext = createContext<RegisterKidAppInterfaceContext | null>(
  null
);
