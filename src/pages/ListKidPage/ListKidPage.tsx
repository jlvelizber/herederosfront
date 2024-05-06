import { Key, useEffect, useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { AppLayout } from "../../layouts";
import { KidInterface, RegisterKidAppInterfaceContext } from "../../interfaces";
import { getYearOldKid } from "../../helpers";
import { useKidRegister } from "../../hooks";
import { RegisterKidAppContext } from "../../contexts";
import { Button, ButtonGroup } from "@mui/material";
import { ModalRegisterKid } from "../../components/ModalRegisterKid";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import QrCodeIcon from "@mui/icons-material/QrCode";
import DeleteIcon from "@mui/icons-material/Delete";
import { ModalShowQrKid } from "../../components";

export const ListKidPage = () => {
  const { listAllKids, removeKid } = useKidRegister();
  const [dataModalQr, setDataModalQr] = useState<{
    open: boolean;
    Kid: KidInterface | null;
  }>({
    Kid: null,
    open: false,
  });
  const {
    setListQueryKids,
    listQueryKids: kids,
    gonnaRegisterNewKid,
    setGonnaRegisterNewKid,
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
    await listAllKids();
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
        handleCloseModal={() => setDataModalQr({open: false, Kid: null})}
        {...dataModalQr}
      />
      <ModalRegisterKid
        open={gonnaRegisterNewKid}
        onNewKidSuccess={onUpdateTableKids}
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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <span className="font-bold"> Identificación del niño(a)</span>
            </TableCell>
            <TableCell>
              <span className="font-bold"> Niño</span>
            </TableCell>
            <TableCell>
              <span className="font-bold">Edad</span>
            </TableCell>
            <TableCell>
              <span className="font-bold"> Padre</span>
            </TableCell>
            <TableCell>
              <span className="font-bold"> Contacto</span>
            </TableCell>
            <TableCell>
              <span className="font-bold"> Acción</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {kids.map((kid: KidInterface, key: Key) => (
            <TableRow key={key}>
              <TableCell>{`${kid.identification}`}</TableCell>
              <TableCell>{`${kid.name} ${kid.lastname}`}</TableCell>
              <TableCell>{` ${getYearOldKid(
                kid.date_born
              )} año(s) `}</TableCell>
              <TableCell>{` ${kid.parent_name} ${kid.parent_lastname} `}</TableCell>
              <TableCell>{` ${kid.parent_phone} / ${kid.parent_email} `}</TableCell>
              <TableCell>
                <ButtonGroup size="small">
                  <Button title="Ver">
                    <RemoveRedEyeIcon />
                  </Button>
                  <Button
                    title="Ver/Generar QR"
                    variant="contained"
                    color="success"
                    onClick={() => handleShowQr(kid)}
                  >
                    <QrCodeIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => handleRemoveKid(kid.id as number)}
                  >
                    <DeleteIcon />
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};
