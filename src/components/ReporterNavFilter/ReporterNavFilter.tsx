import { ChangeEvent, Key, useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useCampus, useKidRegister, useServices } from "../../hooks";
import { RegisterKidAppContext } from "../../contexts";
import {
  CampusInterface,
  CampusServicesInterface,
  RegisterKidAppInterfaceContext,
} from "../../interfaces";

export const ReporterNavFilter = () => {
  const { getListCampus } = useCampus();
  const { getListServices } = useServices();
  const { listtKidsReporterFromDate } = useKidRegister();

  const [filters, setFilters] = useState<{
    campus: string;
    service: string;
    date: string;
  }>({
    campus: "",
    service: "",
    date: "",
  });
  const { listCampus, listServices } = useContext(
    RegisterKidAppContext
  ) as RegisterKidAppInterfaceContext;

  const handleChangeDateReporter = (
    e: ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => {
    const value = e.target.value;
    setFilters({ ...filters, [e.target.name]: value });
  };

  /**
   * Load Services through campus selected
   */

  const loadServices = async (e: SelectChangeEvent) => {
    const campusId: number = parseInt(e.target.value);
    await getListServices(campusId);
  };

  const handleMakeQuery = async () => {
    await listtKidsReporterFromDate(filters.service, filters.date);
  };

  useEffect(() => {
    getListCampus();
  }, []);

  return (
    <div className="p-4 bg-gray row">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <InputLabel id="campus-label">Campus</InputLabel>
          <Select
            labelId="campus-label"
            name="campus"
            label="Campus"
            variant="outlined"
            fullWidth
            value={filters.campus}
            onChange={(e: SelectChangeEvent) => {
              handleChangeDateReporter(e);
              loadServices(e);
            }}
          >
            {listCampus.map(({ name, id }: CampusInterface, key: Key) => (
              <MenuItem key={key} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} md={4}>
          <InputLabel id="servicio-label">Servicio</InputLabel>
          <Select
            labelId="servicio-label"
            name="service"
            label="Servicio"
            variant="outlined"
            fullWidth
            value={filters.service}
            onChange={handleChangeDateReporter}
            disabled={!filters.campus}
          >
            {listServices.map(
              ({ description, id }: CampusServicesInterface, key: Key) => (
                <MenuItem key={key} value={id}>
                  {description}
                </MenuItem>
              )
            )}
          </Select>
        </Grid>
        <Grid item xs={12} md={4}>
          <InputLabel id="servicio-label">Fecha de registro</InputLabel>
          <TextField
            name="date"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{ margin: 0 }}
            type="date"
            InputLabelProps={{ shrink: true }}
            value={filters.date}
            disabled={!filters.campus || !filters.service}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeDateReporter(e)
            }
          />
        </Grid>
        <Grid item xl>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleMakeQuery}
            disabled={!filters.campus || !filters.date || !filters.service}
          >
            Consultar
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
