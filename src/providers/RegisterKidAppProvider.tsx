import { FC, ReactNode, useState } from "react";
import { RegisterKidAppContext } from "../contexts/RegisterKidAppContext";
import { CampusInterface, CampusServicesInterface } from "../interfaces";

export const RegisterKidAppProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [listCampus, setListCampus] = useState<CampusInterface[]>([]);
  const [listServices, setListServices] = useState<CampusServicesInterface[]>(
    []
  );

  return (
    <RegisterKidAppContext.Provider
      value={{ listCampus, setListCampus, listServices, setListServices }}
    >
      {children}
    </RegisterKidAppContext.Provider>
  );
};
