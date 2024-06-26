import { FC, Key } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { KidInterface } from "../../interfaces";
import { getYearOldKid } from "../../helpers";

export const TableListAssistanceKids: FC<{
  kids: KidInterface[];
  handleSelectKid: (kid: KidInterface) => void;
  variant: "remove" | "add";
}> = ({ kids, handleSelectKid, variant = "add" }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <span className="font-bold"> #</span>
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
            <span className="font-bold"> Acción</span>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {kids.map((kid: KidInterface, key: Key) => (
          <TableRow key={key}>
            <TableCell>{`${(key as number) + 1}`}</TableCell>
            <TableCell>{`${kid.name} ${kid.lastname}`}</TableCell>
            <TableCell>
              {kid.date_born
                ? ` ${getYearOldKid(kid.date_born)} año(s) `
                : "No registrado"}
            </TableCell>
            <TableCell>{` ${kid.parent_name} ${kid.parent_lastname} `}</TableCell>
            <TableCell>
              <Button
                variant="outlined"
                color={variant == "add" ? "primary" : "warning"}
                onClick={() => handleSelectKid(kid)}
              >
                {variant === "add" ? <CheckBoxIcon /> : <DeleteIcon />}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
