import { FC, useContext } from "react";
import { KidInterface, RegisterKidAppInterfaceContext } from "../../interfaces";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { RegisterKidAppContext } from "../../contexts";
import { TableListAssistanceKids } from "..";
import { useKidRegister } from "../../hooks";
import { Button } from "@mui/material";

export const ModalDataKidResults: FC<{
  open: boolean;
  kids: KidInterface[];
}> = ({ open, kids }) => {
  const { saveRegisterKid } = useKidRegister();
  const {
    setExistAnyResultQueryKids,
    addKIdToRegisterKids,
    setGonnaRegisterNewKid,
  } = useContext(RegisterKidAppContext) as RegisterKidAppInterfaceContext;

  const handleCloseModal = () => {
    setExistAnyResultQueryKids(false);
  };

  const handleSelectKid = async (kid: KidInterface) => {
    const kidRegister = localStorage.getItem("kidRegister");

    if (kidRegister) {
      const dataJSON = JSON.parse(kidRegister);

      const params = {
        register_user_id: 1,
        kid_id: kid.id as string,
        service_id: dataJSON.service?.id as string,
      };

      const result = await saveRegisterKid(params);
      if (result) addKIdToRegisterKids(kid);

      handleCloseModal();
    }
  };

  const handleOpenRegisterKid = () => {
    handleCloseModal();
    setGonnaRegisterNewKid(true);
  };

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box className='modal'>
        <Box sx={{ float: "right", padding: 0, cursor: "pointer" }}>
          <CloseIcon onClick={handleCloseModal} />
        </Box>

        <Box>
          {kids.length > 0 ? (
            <TableListAssistanceKids
              kids={kids}
              handleSelectKid={(kid: KidInterface) => handleSelectKid(kid)}
              variant="add"
            />
          ) : (
            <Box
              sx={{
                flexDirection: "column",
                marginTop: "20px",
                textAlign: "center",
              }}
            >
              <h1 className="font-bold">
                NO existe niño registrado,¿Desea registrarlo?
              </h1>
              <Box className="py-2 flex justify-around">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpenRegisterKid}
                >
                  Registrar
                </Button>
                <Button onClick={handleCloseModal} variant="outlined">
                  Cancelar
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
};
