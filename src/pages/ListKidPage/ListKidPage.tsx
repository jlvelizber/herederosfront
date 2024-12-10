import { useEffect, useContext, useState } from "react";
import { Button, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { KidInterface, RegisterKidAppInterfaceContext } from "../../interfaces";
import { RegisterKidAppContext } from "../../contexts";
import { useKidRegister } from "../../hooks";
import { AppLayout } from "../../layouts";

import {
  ModalShowQrKid,
  TableReporterRegisterKids,
  ModalRegisterKid,
  ModalEditKid,
  SeekerKidBar,
} from "../../components";

export const ListKidPage = () => {
  const { listAllKids, removeKid, downloadResultList } = useKidRegister();
  const [selectedCampus, setSelectedCampus] = useState<string>("all");

  // Estado para manejar la paginación
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const [dataModalQr, setDataModalQr] = useState<{
    open: boolean;
    Kid: KidInterface | null;
  }>({
    Kid: null,
    open: false,
  });

  const [dataModalEditKid, setDataModalEditKid] = useState<{
    kid: KidInterface | null;
    title: string;
  }>({
    kid: null,
    title: "",
  });

  const {
    setListQueryKids,
    listQueryKids: kids,
    gonnaRegisterNewKid,
    setGonnaRegisterNewKid,
    setGonnaEditKid,
  } = useContext(RegisterKidAppContext) as RegisterKidAppInterfaceContext;

  useEffect(() => {
    listAllKids();
    return () => {
      setListQueryKids([]);
    };
  }, []);

  const onUpdateTableKids = async () => {
    await listAllKids();
  };

  const handleRemoveKid = async (kidId: number) => {
    await removeKid(kidId);
    await onUpdateTableKids();
  };

  const onEditKid = async (kid: KidInterface) => {
    setGonnaEditKid(true);
    setDataModalEditKid({
      kid,
      title: "Edición de niños",
    });
  };

  const handleShowQr = (Kid: KidInterface) => {
    setDataModalQr({
      Kid,
      open: true,
    });
  };

  const handleFindKid = async (query: string) => {
    if (!query) {
      await listAllKids();
      return;
    }
    query = String(query).toLowerCase();
    const copyListKids: KidInterface[] = [...kids];
    const kidsFiltered = copyListKids.filter(({ ...rest }: KidInterface) =>
      Object.values(rest).some((val) =>
        String(val).toLowerCase().includes(query)
      )
    );
    setListQueryKids(kidsFiltered);
  };

  const handleFilterByCampus = async (event: SelectChangeEvent<string>) => {
    const campus = event.target.value;
    setSelectedCampus(campus);
    await listAllKids(campus);
  };

  // Funciones para manejar la paginación
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleExportToExcel = async () => {
    if (selectedCampus !== "all") {
      await downloadResultList(Number(selectedCampus));
    }
  };


  return (
    <AppLayout>
      <ModalShowQrKid
        handleCloseModal={() => setDataModalQr({ open: false, Kid: null })}
        {...dataModalQr}
      />

      <ModalEditKid
        {...dataModalEditKid}
        onSuccessUpdatedKid={onUpdateTableKids}
      />

      <ModalRegisterKid
        open={gonnaRegisterNewKid}
        onNewKidSuccess={onUpdateTableKids}
        titleModal="Registro de niño"
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => setGonnaRegisterNewKid(true)}
        size="large"
      >
        Registrar Niño(a)
      </Button>

      <FormControl fullWidth margin="normal">
        <InputLabel>Filtrar por Campus</InputLabel>
        <Select value={selectedCampus} onChange={handleFilterByCampus}>
          <MenuItem value="all">Todos</MenuItem>
          <MenuItem value={1}>Campus Norte</MenuItem>
          <MenuItem value={2}>Campus Sur</MenuItem>
        </Select>
      </FormControl>

      <SeekerKidBar onPressSeeker={handleFindKid} />

      <TableReporterRegisterKids
        kids={kids}
        onAction={{
          onShowQrKids: handleShowQr,
          onRemoveKids: handleRemoveKid,
          onEditKid,
        }}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Mostrar el botón solo si se ha seleccionado un campus específico */}
      {selectedCampus !== "all" && (
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleExportToExcel}
          color="success"
          style={{ marginTop: "1rem" }}
        >
          <FileDownloadIcon /> Exportar a Excel
        </Button>
      )}
    </AppLayout>
  );
};
