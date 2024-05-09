import { useEffect, useContext, useState } from "react";
import Button from "@mui/material/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { AppLayout } from "../../layouts";
import { ReporterNavFilter, TableReporterRegisterKids } from "../../components";

import { RegisterKidAppInterfaceContext } from "../../interfaces";
import { RegisterKidAppContext } from "../../contexts";
import { useKidRegister } from "../../hooks";

export const ReporterPage = () => {
  const { setListQueryKids, listQueryKids: kids } = useContext(
    RegisterKidAppContext
  ) as RegisterKidAppInterfaceContext;

  const { downloadResultReport } = useKidRegister();

  const [exporting, setExporting] = useState<boolean>(false);
  const [filters, setFilters] = useState<{ service: string; date: string }>({
    date: "",
    service: "",
  });

  useEffect(() => {
    return () => {
      setListQueryKids([]);
    };
  }, []);

  const exportReporterKids = async () => {
    setExporting(true);
    const { service, date } = filters;
    await downloadResultReport(service, date);
    setExporting(false);
  };

  return (
    <AppLayout>
      <ReporterNavFilter
        onFiltersOnNavbar={(filters: { service: string; date: string }) =>
          setFilters(filters)
        }
      />
      {kids.length > 0 && (
        <>
          <TableReporterRegisterKids kids={kids} />
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={exportReporterKids}
            color="success"
            disabled={exporting}
          >
            <FileDownloadIcon /> Exportar
          </Button>
        </>
      )}
    </AppLayout>
  );
};
