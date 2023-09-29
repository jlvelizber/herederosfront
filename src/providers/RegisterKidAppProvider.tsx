import { FC, ReactNode, useState, useEffect } from "react";
import { RegisterKidAppContext } from "../contexts/RegisterKidAppContext";
import { CampusInterface, CampusServicesInterface } from "../interfaces";

export const RegisterKidAppProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [listCampus, setListCampus] = useState<CampusInterface[]>([]);
  const [listServices, setListServices] = useState<CampusServicesInterface[]>(
    []
  );

  const [serviceSelected, setServiceSelected] = useState<number | null>(null);

  const [isRegisterInitiated, setIsRegisterInitiated] =
    useState<boolean>(false);

  useEffect(() => {
    if (!isRegisterInitiated) {
      const existRegister = localStorage.getItem("kidRegister");
      if (existRegister) setIsRegisterInitiated(true);
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
      }}
    >
      {children}
    </RegisterKidAppContext.Provider>
  );
};
