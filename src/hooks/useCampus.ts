import { useContext } from "react";
import { AxiosResponse } from "axios";
import { RegisterApi } from "../api/RegisterApi";
import { CampusInterface, RegisterKidAppInterfaceContext } from "../interfaces";
import { RegisterKidAppContext } from "../contexts";

export const useCampus = () => {
  const { setListCampus } = useContext(
    RegisterKidAppContext
  ) as RegisterKidAppInterfaceContext;

  const getListCampus = async () => {
    try {
      const { data }: AxiosResponse<CampusInterface[]> = await RegisterApi.get(
        "campus"
      );

      setListCampus(data);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getListCampus,
  };
};
