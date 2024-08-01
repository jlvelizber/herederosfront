import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import {
  ChangeEvent,
  FC,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { RegisterKidAppContext } from "../../contexts";
import { useKidRegister } from "../../hooks";
import { KidInterface, RegisterKidAppInterfaceContext } from "../../interfaces";

const defaulKidValues: KidInterface  = {
  identification: "",
  name: "",
  lastname: "",
  date_born: "",
  parent_name: "",
  parent_lastname: "",
  parent_email: "",
  parent_phone: "",
  id: "",
  address: "",
} 

export const ModalRegisterKid: FC<{
  open: boolean;
  titleModal: string;
  onNewKidSuccess: (kid: KidInterface) => void;
  kid?: KidInterface;
}> = ({ open, onNewKidSuccess, titleModal, kid }) => {
  const { saveNewKid, errorsFormRegisterKid, updateKid } = useKidRegister();
  const { setGonnaRegisterNewKid, setErrorsFormRegisterKid, setGonnaEditKid } =
    useContext(RegisterKidAppContext) as RegisterKidAppInterfaceContext;

  const [formData, setFormData] = useState<KidInterface>({
    identification: kid?.identification || "",
    name: kid?.name || "",
    lastname: kid?.lastname || "",
    date_born: kid?.date_born || "",
    parent_name: kid?.parent_name || "",
    parent_lastname: kid?.parent_lastname || "",
    parent_email: kid?.parent_email || "",
    parent_phone: kid?.parent_phone || "",
    id: kid?.id || "",
    address: kid?.address || "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCloseModal = () => {
    setGonnaRegisterNewKid(false);
    setGonnaEditKid(false);
    setFormData(defaulKidValues);
    setErrorsFormRegisterKid(null);
  };

  const handleSaveNewKid = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const kidSaved = await saveNewKid(formData);

    if (kidSaved) {
      onNewKidSuccess(kidSaved);

      handleCloseModal();
    }
  };

  const handleUpdaKid = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const kidSaved = await updateKid(formData);

    if (kidSaved) {
      onNewKidSuccess(kidSaved);

      handleCloseModal();
    }
  };

  useEffect(() => {
    return () => setErrorsFormRegisterKid(null);
  }, []);

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box className="modal">
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
            <form onSubmit={kid?.id ? handleUpdaKid : handleSaveNewKid}>
              <h1 className="font-bold">{titleModal}</h1>
              <Box className="py-2 overflow-y-auto md:overflow-hidden">
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
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
                      value={formData.identification}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      name="name"
                      label="Nombres del niño(a)"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      onChange={handleInputChange}
                      error={errorsFormRegisterKid?.name ? true : false}
                      helperText={errorsFormRegisterKid?.name}
                      value={formData.name}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      name="lastname"
                      label="Apellidos del niño(a)"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      onChange={handleInputChange}
                      error={errorsFormRegisterKid?.lastname ? true : false}
                      helperText={errorsFormRegisterKid?.lastname}
                      value={formData.lastname}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
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
                      value={formData.date_born}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      name="parent_name"
                      label="Nombres del padre o madre"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      onChange={handleInputChange}
                      error={errorsFormRegisterKid?.parent_name ? true : false}
                      helperText={errorsFormRegisterKid?.parent_name}
                      value={formData.parent_name}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
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
                      value={formData.parent_lastname}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      name="parent_email"
                      label="Email del padre o madre"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      onChange={handleInputChange}
                      error={errorsFormRegisterKid?.parent_email ? true : false}
                      helperText={errorsFormRegisterKid?.parent_email}
                      value={formData.parent_email}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      name="parent_phone"
                      label="Teléfono del padre o madre"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      onChange={handleInputChange}
                      error={errorsFormRegisterKid?.parent_phone ? true : false}
                      helperText={errorsFormRegisterKid?.parent_phone}
                      value={formData.parent_phone}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="address"
                      label="Dirección"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      onChange={handleInputChange}
                      error={errorsFormRegisterKid?.address ? true : false}
                      helperText={errorsFormRegisterKid?.address}
                      value={formData.address}
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
