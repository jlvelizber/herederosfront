import Typography from "@mui/material/Typography";
import { AppLayout } from "../../layouts";
import { CampusLIst, ServiceList } from "../../components";

export const RegisterAsistencePage = () => {
  return (
    <AppLayout>
      <Typography variant="h5" noWrap>
        Seleccione el campus
      </Typography>
      <CampusLIst />
      <ServiceList />
    </AppLayout>
  );
};
