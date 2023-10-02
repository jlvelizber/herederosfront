import { Dispatch } from "react";
import { CampusInterface, CampusServicesInterface, KidInterface } from ".";

export interface RegisterKidAppInterfaceContext {
  listCampus: CampusInterface[];
  setListCampus: Dispatch<React.SetStateAction<CampusInterface[]>>;
  setCampusSelected: Dispatch<React.SetStateAction<CampusInterface | null>>;
  campusSelected: CampusInterface | null;
  listServices: CampusServicesInterface[];
  setListServices: Dispatch<React.SetStateAction<CampusServicesInterface[]>>;
  serviceSelected: CampusServicesInterface | null;
  setServiceSelected: Dispatch<
    React.SetStateAction<CampusServicesInterface | null>
  >;
  isRegisterInitiated: boolean;
  setIsRegisterInitiated: Dispatch<React.SetStateAction<boolean>>;
  listQueryKids: KidInterface[];
  setListQueryKids: Dispatch<React.SetStateAction<KidInterface[]>>;
}
