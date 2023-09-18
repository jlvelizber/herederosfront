import { FC } from "react";
import Button from "@mui/material/Button";
import { CampusServicesInterface } from "../../interfaces";

export const CampusServiceListItem: FC<{ service: CampusServicesInterface }> = ({
  service,
}) => {
  //   const { getListServices } = useServices();

  //   const loadServices = async () => {
  //     await getListServices(campus.id);
  //   };

  return (
    <Button size="large" aria-label="large button group">
      <p className="md:text-xl text-md font-bold">{service.description}</p>
    </Button>
  );
};
