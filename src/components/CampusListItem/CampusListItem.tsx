import { FC, useContext } from "react";
import Button from "@mui/material/Button";
import {
  CampusInterface,
  RegisterKidAppInterfaceContext,
} from "../../interfaces";
import { useServices } from "../../hooks";
import { RegisterKidAppContext } from "../../contexts";

export const CampusListItem: FC<{
  campus: CampusInterface;
  disabled: boolean;
  onChangeCampus: (value: number) => void;
}> = ({ campus, disabled, onChangeCampus }) => {
  const { getListServices } = useServices();
  const { setServiceSelected } = useContext(
    RegisterKidAppContext
  ) as RegisterKidAppInterfaceContext;

  const loadServices = async () => {
    setServiceSelected(null);
    onChangeCampus(campus.id);
    await getListServices(campus.id);
  };

  return (
    <Button
      size="large"
      aria-label="large button group"
      onClick={loadServices}
      disabled={disabled}
    >
      <p className="md:text-xl text-md font-bold">{campus.name}</p>
    </Button>
  );
};
