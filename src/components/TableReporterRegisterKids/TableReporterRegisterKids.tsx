import { FC, Key, ChangeEvent } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ButtonGroup,
  Button,
  TableContainer,
  TablePagination,
  Paper,
} from "@mui/material";
import { KidInterface } from "../../interfaces";
import { getYearOldKid } from "../../helpers";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import QrCodeIcon from "@mui/icons-material/QrCode";
import DeleteIcon from "@mui/icons-material/Delete";

interface TableReporterRegisterKidsProps {
  kids: KidInterface[];
  onAction?: {
    onEditKid?: (kid: KidInterface) => void;
    onShowQrKids?: (kid: KidInterface) => void;
    onRemoveKids?: (kidId: number) => void;
  };
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TableReporterRegisterKids: FC<TableReporterRegisterKidsProps> = ({
  kids,
  onAction,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <Paper>
      <TableContainer>
        <Table classes={{ root: "table-auto overflow-scroll w-full" }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <span className="font-bold">N.</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Identificación del niño(a)</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Niño</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Edad</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Padre</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Contacto</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Campus</span>
              </TableCell>
              {onAction && (
                <TableCell>
                  <span className="font-bold">Acción</span>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {kids.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((kid: KidInterface, key: Key) => (
              <TableRow key={key}>
                <TableCell>{page * rowsPerPage + (key as number) + 1}</TableCell>
                <TableCell>{kid.identification}</TableCell>
                <TableCell>{`${kid.name} ${kid.lastname}`}</TableCell>
                <TableCell>
                  {kid.date_born
                    ? `${getYearOldKid(kid.date_born)} año(s)`
                    : "No registrada"}
                </TableCell>
                <TableCell>{`${kid.parent_name} ${kid.parent_lastname}`}</TableCell>
                <TableCell>
                  {`${kid.parent_phone} ${kid.parent_email ? `/${kid.parent_email}` : ""
                    }`}
                </TableCell>
                <TableCell>
                  {Number(kid.campus) === 1 ? "Norte" : Number(kid.campus) === 2 ? "Sur" : ""}
                </TableCell>
                {onAction && (
                  <TableCell>
                    <ButtonGroup size="small">
                      {onAction.onEditKid && (
                        <Button
                          title="Ver"
                          onClick={() => onAction.onEditKid?.(kid)}
                        >
                          <RemoveRedEyeIcon />
                        </Button>
                      )}
                      {onAction.onShowQrKids && (
                        <Button
                          title="Ver/Generar QR"
                          variant="contained"
                          color="success"
                          onClick={() => onAction.onShowQrKids?.(kid)}
                        >
                          <QrCodeIcon />
                        </Button>
                      )}
                      {onAction.onRemoveKids && (
                        <Button
                          variant="outlined"
                          color="warning"
                          onClick={() => onAction.onRemoveKids?.(Number(kid.id))}
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
      </TableContainer>
      <TablePagination
        component="div"
        count={kids.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
};
