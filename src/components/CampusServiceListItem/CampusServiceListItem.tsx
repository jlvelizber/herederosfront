import { FC, useContext } from "react";
import Button from "@mui/material/Button";
import {
  CampusServicesInterface,
  RegisterKidAppInterfaceContext,
} from "../../interfaces";
import { RegisterKidAppContext } from "../../contexts";

export const CampusServiceListItem: FC<{
  service: CampusServicesInterface;
}> = ({ service }) => {
  const { setServiceSelected } = useContext(
    RegisterKidAppContext
  ) as RegisterKidAppInterfaceContext;

  const handleCampusSelected = () => {
    setServiceSelected(service);
  };

  return (
    <Button
      size="large"
      aria-label="large button group"
      onClick={handleCampusSelected}
    >
      <p className="md:text-xl text-md font-bold">{service.description}</p>
    </Button>
  );
};
