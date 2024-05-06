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
import QR  from '/qr.svg'

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
    addKIdToRegisterKids,
  } = useContext(RegisterKidAppContext) as RegisterKidAppInterfaceContext;

  const { loadRegisterOpened, removeKidFromRegister, saveRegisterKid } =
    useKidRegister();

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

  const onHandleRegisterKid = async (kid: KidInterface) => {
    const kidRegister = localStorage.getItem("kidRegister");
    if (kidRegister) {
      const dataJSON = JSON.parse(kidRegister);
      const params = {
        register_user_id: 1,
        kid_id: kid?.id as string,
        service_id: dataJSON.service?.id as string,
      };
      saveRegisterKid(params);

      addKIdToRegisterKids(kid);
    }
  };

  return (
    <>
      <InfoRegisterCampusSelected />

      <QRScanner />

      <img src={QR} width='30%'/>

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

      <ModalRegisterKid
        open={gonnaRegisterNewKid}
        onNewKidSuccess={onHandleRegisterKid}
      />

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
