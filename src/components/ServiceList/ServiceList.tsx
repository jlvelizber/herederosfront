import { useContext } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import {
  CampusServicesInterface,
  RegisterKidAppInterfaceContext,
} from "../../interfaces";
import { RegisterKidAppContext } from "../../contexts";
import { CampusServiceListItem } from "../CampusServiceListItem";

export const ServiceList = () => {
  const { listServices } = useContext(
    RegisterKidAppContext
  ) as RegisterKidAppInterfaceContext;

  if (listServices.length === 0) return "Cargando";
  console.log(listServices);
  return (
    <div className="w-full flex justify-around py-3">
      <ButtonGroup size="large" aria-label="large button group">
        {listServices.map((service: CampusServicesInterface, key: number) => (
          <CampusServiceListItem service={service} key={key} />
        ))}
      </ButtonGroup>
    </div>
  );
};
