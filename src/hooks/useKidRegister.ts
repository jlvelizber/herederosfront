import { AxiosResponse } from "axios";
import { RegisterApi } from "../api/RegisterApi";
import { KidInterface, RegisterKidAppInterfaceContext } from "../interfaces";
import { useContext } from "react";
import { RegisterKidAppContext } from "../contexts";

export const useKidRegister = () => {
  const { setListQueryKids } = useContext(
    RegisterKidAppContext
  ) as RegisterKidAppInterfaceContext;

  const findKids = async (query: string) => {
    const { data }: AxiosResponse<KidInterface[]> = await RegisterApi.get(
      `kids/findkids?query=${query}`
    );
    

    /** es exitoso */
    setListQueryKids(data);
    
  };

  return {
    findKids,
  };
};
