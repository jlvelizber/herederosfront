import { useContext } from "react";
import { ButtonGroup } from "@mui/material";
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

  return (
    <div className="w-full flex justify-around py-3">
      <ButtonGroup size="large" aria-label="large button group" classes={{ root: 'w-full' }}>
        {listServices?.map((service: CampusServicesInterface, key: number) => (
          <CampusServiceListItem service={service} key={key} />
        ))}
      </ButtonGroup>
    </div>
  );
};
