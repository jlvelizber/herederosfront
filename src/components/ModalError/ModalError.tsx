import { FC, useState } from "react";
import { Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
      <Box sx={style}>
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
