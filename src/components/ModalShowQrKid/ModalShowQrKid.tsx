import { FC, useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { KidInterface } from "../../interfaces";

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

export const ModalShowQrKid: FC<{
  open: boolean;
  Kid: KidInterface | null;
  handleCloseModal: () => void;
}> = ({ Kid, open, handleCloseModal }) => {
  const [svgCode, setSvgCode] = useState<string>("");

  useEffect(() => setSvgCode(Kid?.qr as string), [Kid]);

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box sx={style}>
        <Box sx={{ float: "right", padding: 0, cursor: "pointer" }}>
          <CloseIcon onClick={handleCloseModal} />
        </Box>
        <Box>
          <h1 className="text-center text-black font-semibold text-title-xl">{Kid?.name} {Kid?.lastname}</h1>
          <div dangerouslySetInnerHTML={{ __html: svgCode }} />
        </Box>
      </Box>
    </Modal>
  );
};
