import { FC, useContext, useEffect } from "react";
import { Button } from "@mui/material";
import {
  InfoRegisterCampusSelected,
  ModalDataKidResults,
  ModalError,
  QRScanner,
  SeekerKidBar,
  TableListAssistanceKids,
} from "..";
import { RegisterKidAppContext } from "../../contexts";
import { KidInterface, RegisterKidAppInterfaceContext } from "../../interfaces";
import { useKidRegister } from "../../hooks";
import { ModalRegisterKid } from "../ModalRegisterKid";


export const AssistanceRegisterKid:FC = () => {
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

  const { loadRegisterOpened, removeKidFromRegister, saveRegisterKid, findKids } =
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

  const handleFinKids = async (valueSeeker: string) =>
    await findKids(valueSeeker);

  return (
    <>
      <InfoRegisterCampusSelected />

      <QRScanner />

      <SeekerKidBar onPressSeeker={handleFinKids} />


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
        titleModal="Registro de Niños"
      />

      {/* Listado de asistencia */}
      {listRegisterKids.length > 0 && (
        <TableListAssistanceKids
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
