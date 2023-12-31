import { AxiosResponse } from "axios";
import { RegisterApi } from "../api/RegisterApi";
import { KidInterface, RegisterKidAppInterfaceContext } from "../interfaces";
import { useContext } from "react";
import { RegisterKidAppContext } from "../contexts";

export const useKidRegister = () => {
  const {
    setListQueryKids,
    setExistAnyResultQueryKids,
    setListRegisterKids,
    removeKIdToRegisterKids,
  } = useContext(RegisterKidAppContext) as RegisterKidAppInterfaceContext;

  const findKids = async (query: string) => {
    setExistAnyResultQueryKids(false);
    const { data }: AxiosResponse<KidInterface[]> = await RegisterApi.get(
      `kids/findkids?query=${query}`
    );

    setExistAnyResultQueryKids(true);
    /** es exitoso */
    setListQueryKids(data);
  };

  const saveRegisterKid = async ({
    kid_id,
    service_id,
    register_user_id,
  }: {
    kid_id: string;
    service_id: string;
    register_user_id: number;
  }) => {
    const { data }: AxiosResponse<unknown> = await RegisterApi.post(
      `registers`,
      { kid_id, service_id, register_user_id }
    );
    return data;
  };

  const loadRegisterOpened = async () => {
    const existRegister = localStorage.getItem("kidRegister");
    if (existRegister) {
      const dataRegister = JSON.parse(existRegister);
      const {
        service: { id },
      } = dataRegister;
      const { data }: AxiosResponse<KidInterface[]> = await RegisterApi.get(
        `registers?service_id=${id}`
      );
      setListRegisterKids(data);
    }
  };

  const removeKidFromRegister = async (kid: KidInterface) => {
    try {
      const existRegister = localStorage.getItem("kidRegister");
      if (existRegister) {
        const dataRegister = JSON.parse(existRegister);
        const {
          service: { id },
        } = dataRegister;

        removeKIdToRegisterKids(kid);
        const { data }: AxiosResponse<boolean> = await RegisterApi.delete(
          `registers/${kid.id}`,
          {
            data: {
              service_id: id,
            },
          }
        );

        return data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveNewKid = async (kidData: KidInterface) => {
    try {
      const { data }: AxiosResponse<KidInterface> = await RegisterApi.post(
        `kids`,
        kidData
      );

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const listAllKids = async () => {
    const { data }: AxiosResponse<KidInterface[]> = await RegisterApi.get(
      `kids`
    );
    setListQueryKids(data);
  };

  const listtKidsReporterFromDate = async (
    serviceId: string,
    dateString: string
  ) => {
    const { data }: AxiosResponse<KidInterface[]> = await RegisterApi.get(
      `registers/query?service_id=${serviceId}&date=${dateString}`
    );
    setListQueryKids(data);
  };

  return {
    findKids,
    saveRegisterKid,
    loadRegisterOpened,
    removeKidFromRegister,
    saveNewKid,
    listAllKids,
    listtKidsReporterFromDate,
  };
};
