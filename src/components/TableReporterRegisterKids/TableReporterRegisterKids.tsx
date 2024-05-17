import { FC, Key } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ButtonGroup,
  Button,
} from "@mui/material";
import { KidInterface } from "../../interfaces";
import { getYearOldKid } from "../../helpers";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import QrCodeIcon from "@mui/icons-material/QrCode";
import DeleteIcon from "@mui/icons-material/Delete";

export const TableReporterRegisterKids: FC<{
  kids: KidInterface[];
  onAction?: {
    onEditKid?: (kid: KidInterface) => void;
    onShowQrKids?: (kid: KidInterface) => void;
    onRemoveKids?: (kidId: number) => void;
  };
}> = ({ kids, onAction }) => {
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
          {onAction && (
            <TableCell>
              <span className="font-bold"> Acción</span>
            </TableCell>
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {kids.map((kid: KidInterface, key: Key) => (
          <TableRow key={key}>
            <TableCell>{`${kid.identification}`}</TableCell>
            <TableCell>{`${kid.name} ${kid.lastname}`}</TableCell>
            <TableCell>
              {kid.date_born
                ? ` ${getYearOldKid(kid.date_born)} año(s) `
                : "No registrada"}
            </TableCell>
            <TableCell>{` ${kid.parent_name} ${kid.parent_lastname} `}</TableCell>
            <TableCell>{` ${kid.parent_phone}  ${
              kid.parent_email ? `/${kid.parent_email}` : ""
            } `}</TableCell>
            {onAction && (
              <TableCell>
                <ButtonGroup size="small">
                  {onAction.onEditKid! && (
                    <Button
                      title="Ver"
                      onClick={() => {
                        const edit = onAction?.onEditKid as (
                          kid: KidInterface
                        ) => void;
                        edit(kid);
                      }}
                    >
                      <RemoveRedEyeIcon />
                    </Button>
                  )}
                  {onAction.onShowQrKids! && (
                    <Button
                      title="Ver/Generar QR"
                      variant="contained"
                      color="success"
                      onClick={() => {
                        const show = onAction?.onShowQrKids as (
                          kid: KidInterface
                        ) => void;
                        show(kid);
                      }}
                    >
                      <QrCodeIcon />
                    </Button>
                  )}
                  {onAction.onRemoveKids! && (
                    <Button
                      variant="outlined"
                      color="warning"
                      onClick={() => {
                        const remove = onAction?.onRemoveKids as (
                          kidId: number
                        ) => void;
                        remove(kid?.id as number);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  )}
                </ButtonGroup>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
