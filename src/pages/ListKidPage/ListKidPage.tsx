import { Key, useEffect, useContext } from "react";
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
import { Button } from "@mui/material";
import { ModalRegisterKid } from "../../components/ModalRegisterKid";

export const ListKidPage = () => {
  const { listAllKids } = useKidRegister();
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

  return (
    <AppLayout>
      <ModalRegisterKid open={gonnaRegisterNewKid} />
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};
