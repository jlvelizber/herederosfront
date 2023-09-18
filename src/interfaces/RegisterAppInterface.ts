import { Dispatch } from "react";
import { CampusInterface, CampusServicesInterface } from ".";

export interface RegisterKidAppInterfaceContext {
  listCampus: CampusInterface[];
  setListCampus: Dispatch<React.SetStateAction<CampusInterface[]>>;
  listServices: CampusServicesInterface[];
  setListServices: Dispatch<React.SetStateAction<CampusServicesInterface[]>>;
}
