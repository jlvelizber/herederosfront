import { FC, useState } from "react";
import { Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const ModalError: FC<{ message: string; onClose: () => void }> = ({
  message,
  onClose,
}) => {
  const [open, setOpen] = useState<boolean>(true);

  const handleCLose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleCLose}>
      <Box className='modal'>
        <Box>
          <Box sx={{ float: "right", padding: 0, cursor: "pointer" }}>
            <CloseIcon onClick={handleCLose} />
          </Box>
        </Box>
        <Box>{message}</Box>
      </Box>
    </Modal>
  );
};
