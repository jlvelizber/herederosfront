import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CampusLIst, ServiceList } from "..";
import { RegisterKidAppContext } from "../../contexts";
import { RegisterKidAppInterfaceContext } from "../../interfaces";

export const BeginRegisterAsistence = () => {
  const { serviceSelected, campusSelected, setIsRegisterInitiated } =
    useContext(RegisterKidAppContext) as RegisterKidAppInterfaceContext;

  const beginRegister = () => {
    localStorage.setItem(
      "kidRegister",
      JSON.stringify({
        status: "open",
        service: serviceSelected,
        campus: campusSelected,
      })
    );
    setIsRegisterInitiated(true);
  };

  return (
    <>
      <Typography variant="h5" noWrap>
        Seleccione el campus
      </Typography>
      <CampusLIst />
      <ServiceList />

      {serviceSelected && (
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={beginRegister}
        >
          Empezar Registro
        </Button>
      )}
    </>
  );
};
