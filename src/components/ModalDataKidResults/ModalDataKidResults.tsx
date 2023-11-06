import { FC, useContext } from "react";
import { KidInterface, RegisterKidAppInterfaceContext } from "../../interfaces";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { RegisterKidAppContext } from "../../contexts";
import { TableListKids } from "..";
import { useKidRegister } from "../../hooks";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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

      await saveRegisterKid(params);

      addKIdToRegisterKids(kid);
      handleCloseModal();
    }
  };

  const handleOpenRegisterKid = () => {
    handleCloseModal();
    setGonnaRegisterNewKid(true);
  };

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box sx={style}>
        <Box sx={{ float: "right", padding: 0, cursor: "pointer" }}>
          <CloseIcon onClick={handleCloseModal} />
        </Box>

        <Box>
          {kids.length > 0 ? (
            <TableListKids
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
