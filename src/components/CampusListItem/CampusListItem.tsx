import { FC } from "react";
import Button from "@mui/material/Button";
import { CampusInterface } from "../../interfaces";
import { useServices } from "../../hooks";

export const CampusListItem: FC<{ campus: CampusInterface }> = ({ campus }) => {
  const { getListServices } = useServices();

  const loadServices = async () => {
    await getListServices(campus.id);
  };

  return (
    <Button size="large" aria-label="large button group" onClick={loadServices}>
      <p className="md:text-xl text-md font-bold">{campus.name}</p>
    </Button>
  );
};
