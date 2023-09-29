import { useEffect, useContext, useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useCampus } from "../../hooks";
import {
  CampusInterface,
  RegisterKidAppInterfaceContext,
} from "../../interfaces";
import { RegisterKidAppContext } from "../../contexts";
import { CampusListItem } from "..";

export const CampusLIst = () => {
  const [campusSelected, setCampusSeleted] = useState<number | null>(null);

  const { listCampus } = useContext(
    RegisterKidAppContext
  ) as RegisterKidAppInterfaceContext;

  const { getListCampus } = useCampus();

  useEffect(() => {
    getListCampus();
  }, []);

  return (
    <div className="w-full flex justify-around py-3">
      <ButtonGroup size="large" aria-label="large button group">
        {listCampus?.map((campus: CampusInterface, key: number) => (
          <CampusListItem
            campus={campus}
            key={key}
            disabled={campusSelected === campus.id}
            onChangeCampus={(value) => setCampusSeleted(value)}
          />
        ))}
      </ButtonGroup>
    </div>
  );
};
