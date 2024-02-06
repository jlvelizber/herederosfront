import { FC, useContext, useState, ChangeEvent, FormEvent } from "react";
import { KidInterface, RegisterKidAppInterfaceContext } from "../../interfaces";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import { RegisterKidAppContext } from "../../contexts";
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

export const ModalRegisterKid: FC<{
  open: boolean;
}> = ({ open }) => {
  const { saveNewKid, saveRegisterKid, errorsFormRegisterKid } =
    useKidRegister();
  const { setGonnaRegisterNewKid, addKIdToRegisterKids } = useContext(
    RegisterKidAppContext
  ) as RegisterKidAppInterfaceContext;

  const [formData, setFormData] = useState<KidInterface>({
    identification: "",
    name: "",
    lastname: "",
    date_born: "",
    parent_name: "",
    parent_lastname: "",
    parent_email: "",
    parent_phone: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCloseModal = () => {
    setGonnaRegisterNewKid(false);
  };

  const handleSaveNewKid = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const kidSaved = await saveNewKid(formData);

    const kidRegister = localStorage.getItem("kidRegister");

    if (kidRegister) {
      const dataJSON = JSON.parse(kidRegister);

      const params = {
        register_user_id: 1,
        kid_id: kidSaved?.id as string,
        service_id: dataJSON.service?.id as string,
      };
      saveRegisterKid(params);

      if (kidSaved) {
        addKIdToRegisterKids(kidSaved);
        handleCloseModal();
      }
    }
  };

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box sx={style}>
        <Box sx={{ float: "right", padding: 0, cursor: "pointer" }}>
          <CloseIcon onClick={handleCloseModal} />
        </Box>

        <Box>
          <Box
            sx={{
              flexDirection: "column",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            <form onSubmit={handleSaveNewKid}>
              <h1 className="font-bold">Registro de nuevo Niño(a)</h1>
              <Box className="py-2">
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <TextField
                      name="identification"
                      label="Identificación del niño(a)"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      onChange={handleInputChange}
                      error={
                        errorsFormRegisterKid?.identification ? true : false
                      }
                      helperText={errorsFormRegisterKid?.identification}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      name="name"
                      label="Nombres del niño(a)"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      onChange={handleInputChange}
                      error={errorsFormRegisterKid?.name ? true : false}
                      helperText={errorsFormRegisterKid?.name}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="lastname"
                      label="Apellidos del niño(a)"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      onChange={handleInputChange}
                      error={errorsFormRegisterKid?.lastname ? true : false}
                      helperText={errorsFormRegisterKid?.lastname}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="date_born"
                      label="Fecha de nacimiento"
                      type="date"
                      variant="outlined"
                      placeholder=""
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      margin="normal"
                      onChange={handleInputChange}
                      error={errorsFormRegisterKid?.date_born ? true : false}
                      helperText={errorsFormRegisterKid?.date_born}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="parent_name"
                      label="Nombres del padre o madre"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      onChange={handleInputChange}
                      error={errorsFormRegisterKid?.parent_name ? true : false}
                      helperText={errorsFormRegisterKid?.parent_name}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="parent_lastname"
                      label="Apellidos del padre o madre"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      onChange={handleInputChange}
                      error={
                        errorsFormRegisterKid?.parent_lastname ? true : false
                      }
                      helperText={errorsFormRegisterKid?.parent_lastname}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="parent_email"
                      label="Email del padre o madre"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      onChange={handleInputChange}
                      error={errorsFormRegisterKid?.parent_email ? true : false}
                      helperText={errorsFormRegisterKid?.parent_email}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="parent_phone"
                      label="Teléfono del padre o madre"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      onChange={handleInputChange}
                      error={errorsFormRegisterKid?.parent_phone ? true : false}
                      helperText={errorsFormRegisterKid?.parent_phone}
                    />
                  </Grid>
                </Grid>
                <Box className="flex justify-around">
                  <Button variant="contained" color="primary" type="submit">
                    Guardar
                  </Button>
                  <Button onClick={handleCloseModal} variant="outlined">
                    Cancelar
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
