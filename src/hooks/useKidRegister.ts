import { useContext } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { RegisterApi } from "../api/RegisterApi";
import { KidInterface, RegisterKidAppInterfaceContext } from "../interfaces";
import { RegisterKidAppContext } from "../contexts";
import { HTTP_STATUS_CODE } from "../helpers";

export const useKidRegister = () => {
  const {
    setListQueryKids,
    setExistAnyResultQueryKids,
    setListRegisterKids,
    removeKIdToRegisterKids,
    setErrorsFormRegisterKid,
    errorsFormRegisterKid,

    setErrorsFromRegisterKidAsistance
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
    try {
      const { data }: AxiosResponse<unknown> = await RegisterApi.post(
        `registers`,
        { kid_id, service_id, register_user_id }
      );
      setErrorsFromRegisterKidAsistance(null)
      return data;

    } catch (error) {

      if (error instanceof AxiosError) {
        if (error?.code === HTTP_STATUS_CODE.ERR_BAD_REQUEST) {
          //TODO:  mensaje de nino repetido -- cambiar la forma en que viene desde el back
          setErrorsFromRegisterKidAsistance(error.response?.data?.data?.kid_id);
        }
      }
    }
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
      delete kidData.id;
      const { data }: AxiosResponse<KidInterface> = await RegisterApi.post(
        `kids`,
        kidData
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.code === HTTP_STATUS_CODE.ERR_BAD_REQUEST) {
          // console.log(error.response?.data);
          setErrorsFormRegisterKid(error.response?.data);
        }
        // setErrors(error?.response?.data as ErrorAuthStateContextInterface)
        // console.error(error);
      }
    }
  };
  const updateKid = async (kidData: KidInterface) => {
    try {
      const { data }: AxiosResponse<KidInterface> = await RegisterApi.put(
        `kids/${kidData.id}`,
        kidData
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.code === HTTP_STATUS_CODE.ERR_BAD_REQUEST) {
          // console.log(error.response?.data);
          setErrorsFormRegisterKid(error.response?.data);
        }
        // setErrors(error?.response?.data as ErrorAuthStateContextInterface)
        // console.error(error);
      }
    }
  };

  // const listAllKids = async () => {
  //   const { data }: AxiosResponse<KidInterface[]> = await RegisterApi.get(
  //     `kids`
  //   );
  //   setListQueryKids(data);
  // };

  const listAllKids = async (campus: string | number = "all") => {
    try {
      const { data }: AxiosResponse<KidInterface[]> = await RegisterApi.get(`kids`);
      // console.log("Datos recibidos:", data);

      // Imprimir el primer registro para ver su estructura
      // if (data.length > 0) {
      //   console.log("Primer registro recibido:", data[0]);
      // }
      // console.log("Valor del campus seleccionado:", campus);

      // Convertir campus a número solo si no es "all"
      const campusNumber = campus === "all" ? "all" : Number(campus);
      // console.log("campus a número:", campusNumber);

      // Imprimir los valores de kid.campus para cada registro
      // data.forEach((kid) => {
      //   console.log(`Kid: ${kid.name}, Campus en la tabla:`, kid.campus);
      // });

      // Filtrar solo si se selecciona un campus específico
      const filteredData = campus === "all" ? data : data.filter((kid) => kid.campus === campusNumber);
      // console.log("Datos filtrados:", filteredData);

      setListQueryKids(filteredData);
    } catch (error) {
      console.error("Error al obtener la lista de niños:", error);
    }
  };

  const removeKid = async (kidId: number) => {
    try {
      const { data }: AxiosResponse<boolean> = await RegisterApi.delete(
        `kids/${kidId}`
      );

      return data;

    } catch (error) {
      console.error(error);
    }
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

  const downloadResultReport = async (
    serviceId: string,
    dateString: string
  ) => {
    if (dateString && serviceId) {
      const response = await RegisterApi.post(
        `registers/export-query`,
        {
          serviceId,
          dateString,
        },
        {
          responseType: "blob",
        }
      );

      const href = window.URL.createObjectURL(response.data);

      const anchorElement = document.createElement("a");

      anchorElement.href = href;
      anchorElement.download = "herederos_asistencia_" + dateString;

      document.body.appendChild(anchorElement);
      anchorElement.click();

      document.body.removeChild(anchorElement);
      window.URL.revokeObjectURL(href);
    }
  };

  const downloadResultList = async (campusId: number) => {
    try {
      const response = await RegisterApi.post(
        `kids/export/${campusId}`,
        {},
        { responseType: "blob" } // Indicar que esperamos un archivo blob
      );

      // console.log("Respuesta del servidor:", response);

      // Determinar el nombre del campus según el campusId
      const campusName = campusId === 1 ? "norte" : campusId === 2 ? "sur" : "";

      const href = window.URL.createObjectURL(response.data);
      const anchorElement = document.createElement("a");
      anchorElement.href = href;
      anchorElement.download = `herederos_listado_por_campus_${campusName}.xlsx`;

      document.body.appendChild(anchorElement);
      anchorElement.click();

      document.body.removeChild(anchorElement);
      window.URL.revokeObjectURL(href);
    } catch (error) {
      console.error("Error al descargar el reporte:", error);
    }
  };

  return {
    findKids,
    saveRegisterKid,
    loadRegisterOpened,
    removeKidFromRegister,
    saveNewKid,
    updateKid,
    listAllKids,
    listtKidsReporterFromDate,
    errorsFormRegisterKid,
    downloadResultReport,
    downloadResultList,
    removeKid
  };
};
