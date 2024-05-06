import { FC, Key } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { KidInterface } from "../../interfaces";
import { getYearOldKid } from "../../helpers";


export const TableReporterRegisterKids: FC<{ kids: KidInterface[] }> = ({
  kids,
}) => {
  return (
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
            <TableCell>{` ${getYearOldKid(kid.date_born)} año(s) `}</TableCell>
            <TableCell>{` ${kid.parent_name} ${kid.parent_lastname} `}</TableCell>
            <TableCell>{` ${kid.parent_phone} / ${kid.parent_email} `}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
