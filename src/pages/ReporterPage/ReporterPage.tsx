import { useEffect, useContext, useState, ChangeEvent } from "react";
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

  // Estados para la paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    return () => {
      setListQueryKids([]);
    };
  }, [setListQueryKids]);

  const exportReporterKids = async () => {
    setExporting(true);
    const { service, date } = filters;
    await downloadResultReport(service, date);
    setExporting(false);
  };

  // Manejar cambio de página
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Manejar cambio de filas por página
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
          <TableReporterRegisterKids
            kids={kids}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
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
