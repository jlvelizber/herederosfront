import { useContext } from "react";
import { AxiosResponse } from "axios";
import { RegisterApi } from "../api/RegisterApi";
import {
  CampusServicesInterface,
  RegisterKidAppInterfaceContext,
} from "../interfaces";
import { RegisterKidAppContext } from "../contexts";

export const useServices = () => {
  const { setListServices } = useContext(
    RegisterKidAppContext
  ) as RegisterKidAppInterfaceContext;

  const getListServices = async (id: number) => {
    try {
      const { data }: AxiosResponse<CampusServicesInterface[]> =
        await RegisterApi.get(`campus-services/${id}`);

      setListServices(data);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getListServices,
  };
};
