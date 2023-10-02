import React, { useContext } from "react";
import { Button } from "@mui/material";
import { InfoRegisterCampusSelected, SeekerKidBar } from "..";
import { RegisterKidAppContext } from "../../contexts";
import { KidInterface, RegisterKidAppInterfaceContext } from "../../interfaces";

export const TableRegisterKid = () => {
  const { setServiceSelected, setIsRegisterInitiated, listQueryKids } =
    useContext(RegisterKidAppContext) as RegisterKidAppInterfaceContext;

  const handleCLoseRegister = () => {
    localStorage.removeItem("kidRegister");
    setServiceSelected(null);
    setIsRegisterInitiated(false);
  };

  return (
    <>
      <InfoRegisterCampusSelected />

      <SeekerKidBar />

      {listQueryKids?.length &&
        
        listQueryKids.map(
          (kid: KidInterface) => `${kid.name} ${kid.lastname} `
        )}

      <Button
        variant="contained"
        color="warning"
        fullWidth
        onClick={handleCLoseRegister}
        size="large"
      >
        Cerrar Registro
      </Button>
    </>
  );
};
