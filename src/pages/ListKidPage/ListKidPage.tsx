import { useEffect, useContext, useState } from "react";
import { Button } from "@mui/material";
import { KidInterface, RegisterKidAppInterfaceContext } from "../../interfaces";
import { RegisterKidAppContext } from "../../contexts";
import { useKidRegister } from "../../hooks";
import { AppLayout } from "../../layouts";
import {
  ModalShowQrKid,
  TableReporterRegisterKids,
  ModalRegisterKid,
  ModalEditKid,
} from "../../components";

export const ListKidPage = () => {
  const { listAllKids, removeKid } = useKidRegister();
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

      <TableReporterRegisterKids
        kids={kids}
        onAction={{
          onShowQrKids: handleShowQr,
          onRemoveKids: handleRemoveKid,
          onEditKid,
        }}
      />
    </AppLayout>
  );
};
