import { FC, useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { KidInterface } from "../../interfaces";


export const ModalShowQrKid: FC<{
  open: boolean;
  Kid: KidInterface | null;
  handleCloseModal: () => void;
}> = ({ Kid, open, handleCloseModal }) => {
  const [svgCode, setSvgCode] = useState<string>("");

  useEffect(() => setSvgCode(Kid?.qr as string), [Kid]);

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box className='modal'>
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
