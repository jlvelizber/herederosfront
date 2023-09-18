import { useEffect, useContext } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useCampus } from "../../hooks";
import {
  CampusInterface,
  RegisterKidAppInterfaceContext,
} from "../../interfaces";
import { RegisterKidAppContext } from "../../contexts";
import { CampusListItem } from "..";

export const CampusLIst = () => {
  const { listCampus } = useContext(
    RegisterKidAppContext
  ) as RegisterKidAppInterfaceContext;

  const { getListCampus } = useCampus();

  useEffect(() => {
    getListCampus();
  }, []);

  if (listCampus.length === 0) return "Cargando";

  return (
    <div className="w-full flex justify-around py-3">

      <ButtonGroup size="large" aria-label="large button group">
        {listCampus.map((campus: CampusInterface, key: number) => (
          <CampusListItem campus={campus} key={key} />
        ))}
      </ButtonGroup>
    </div>
  );
};
