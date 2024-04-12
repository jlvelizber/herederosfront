import { useContext, useEffect } from "react";
import { Button } from "@mui/material";
import {
  InfoRegisterCampusSelected,
  ModalDataKidResults,
  ModalError,
  QRScanner,
  SeekerKidBar,
  TableListKids,
} from "..";
import { RegisterKidAppContext } from "../../contexts";
import { KidInterface, RegisterKidAppInterfaceContext } from "../../interfaces";
import { useKidRegister } from "../../hooks";
import { ModalRegisterKid } from "../ModalRegisterKid";
import QR from "/qr.svg";

export const TableRegisterKid = () => {
  const {
    setServiceSelected,
    setCampusSelected,
    setIsRegisterInitiated,
    listQueryKids,
    existAnyResultQueryKids,
    listRegisterKids,
    gonnaRegisterNewKid,
    errorsFromRegisterKidAsistance,
    setErrorsFromRegisterKidAsistance,
  } = useContext(RegisterKidAppContext) as RegisterKidAppInterfaceContext;

  const { loadRegisterOpened, removeKidFromRegister } = useKidRegister();

  useEffect(() => {
    loadRegisterOpened();
  }, []);

  const handleCLoseModelError = () => setErrorsFromRegisterKidAsistance(null);

  const handleCLoseRegister = () => {
    localStorage.removeItem("kidRegister");
    setServiceSelected(null);
    setCampusSelected(null);
    setIsRegisterInitiated(false);
  };

  const handleRemoveKidRegister = async (kid: KidInterface) => {
    await removeKidFromRegister(kid);
  };

  return (
    <>
      <InfoRegisterCampusSelected />

      <QRScanner />

      <SeekerKidBar />

      <ModalDataKidResults
        open={existAnyResultQueryKids}
        kids={listQueryKids}
      />

      {errorsFromRegisterKidAsistance && (
        <ModalError
          message={errorsFromRegisterKidAsistance}
          onClose={handleCLoseModelError}
        />
      )}

      <ModalRegisterKid open={gonnaRegisterNewKid} />

      {/* Listado de asistencia */}
      {listRegisterKids.length > 0 && (
        <TableListKids
          variant="remove"
          kids={listRegisterKids}
          handleSelectKid={(kid) => handleRemoveKidRegister(kid)}
        />
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
