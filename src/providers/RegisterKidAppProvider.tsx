import { FC, ReactNode, useState, useEffect } from "react";
import { RegisterKidAppContext } from "../contexts/RegisterKidAppContext";
import {
  CampusInterface,
  CampusServicesInterface,
  KidInterface,
} from "../interfaces";

export const RegisterKidAppProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  /**
   * Campus
   */
  const [listCampus, setListCampus] = useState<CampusInterface[]>([]);
  const [campusSelected, setCampusSelected] = useState<CampusInterface | null>(
    null
  );

  /**
   * Servicios
   */
  const [listServices, setListServices] = useState<CampusServicesInterface[]>(
    []
  );
  const [serviceSelected, setServiceSelected] =
    useState<CampusServicesInterface | null>(null);

  /**
   * Empieza registro
   */
  const [isRegisterInitiated, setIsRegisterInitiated] =
    useState<boolean>(false);

  /**
   * Query Kids
   */
  const [listQueryKids, setListQueryKids] = useState<KidInterface[]>([]);
  const [existAnyResultQueryKids, setExistAnyResultQueryKids] =
    useState<boolean>(false);

  /**
   *List Kids in Register Kids
   */

  const [listRegisterKids, setListRegisterKids] = useState<KidInterface[]>([]);

  /**
   * Errores desde el formulario de registro de un niño
   */
  const [errorsFormRegisterKid, setErrorsFormRegisterKid] =
    useState<KidInterface | null>(null);

  const [errorsFromRegisterKidAsistance, setErrorsFromRegisterKidAsistance] =
    useState<string | null>(null);

  /**
   * In chagrge open modal for new register kids
   */
  const [gonnaRegisterNewKid, setGonnaRegisterNewKid] =
    useState<boolean>(false);

  const [gonnaEditKid, setGonnaEditKid] = useState<boolean>(false);

  const addKIdToRegisterKids = (kid: KidInterface) => {
    setListRegisterKids((prevState) => [...prevState, kid]);
  };

  const removeKIdToRegisterKids = (kid: KidInterface) => {
    const copyKidsReistereds = [...listRegisterKids];

    const newListKidsRegistereds = copyKidsReistereds.filter(
      (kidInList: KidInterface) => kidInList.id !== kid.id
    );

    setListRegisterKids(newListKidsRegistereds);
  };

  useEffect(() => {
    if (!isRegisterInitiated) {
      const existRegister = localStorage.getItem("kidRegister");
      if (existRegister) {
        const registerData = JSON.parse(existRegister);
        setIsRegisterInitiated(true);
        setCampusSelected(registerData?.campus);
        setServiceSelected(registerData?.service);
      }
    }
  }, [isRegisterInitiated]);

  return (
    <RegisterKidAppContext.Provider
      value={{
        listCampus,
        setListCampus,
        listServices,
        setListServices,
        serviceSelected,
        setServiceSelected,
        isRegisterInitiated,
        setIsRegisterInitiated,
        campusSelected,
        setCampusSelected,
        listQueryKids,
        setListQueryKids,
        existAnyResultQueryKids,
        setExistAnyResultQueryKids,
        listRegisterKids,
        setListRegisterKids,
        addKIdToRegisterKids,
        removeKIdToRegisterKids,
        gonnaRegisterNewKid,
        setGonnaRegisterNewKid,
        errorsFormRegisterKid,
        setErrorsFormRegisterKid,
        errorsFromRegisterKidAsistance,
        setErrorsFromRegisterKidAsistance,
        setGonnaEditKid,
        gonnaEditKid,
      }}
    >
      {children}
    </RegisterKidAppContext.Provider>
  );
};
