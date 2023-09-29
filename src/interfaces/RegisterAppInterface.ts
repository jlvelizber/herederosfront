import { Dispatch } from "react";
import { CampusInterface, CampusServicesInterface } from ".";

export interface RegisterKidAppInterfaceContext {
  listCampus: CampusInterface[];
  setListCampus: Dispatch<React.SetStateAction<CampusInterface[]>>;
  listServices: CampusServicesInterface[];
  setListServices: Dispatch<React.SetStateAction<CampusServicesInterface[]>>;
  serviceSelected: number | null;
  setServiceSelected: Dispatch<React.SetStateAction<number|null>>;
  isRegisterInitiated: boolean;
  setIsRegisterInitiated: Dispatch<React.SetStateAction<boolean>>;

}
