import { FC, useContext } from "react";
import { ModalRegisterKid } from "../ModalRegisterKid";
import { KidInterface, RegisterKidAppInterfaceContext } from "../../interfaces";
import { RegisterKidAppContext } from "../../contexts";

export const ModalEditKid: FC<{ kid: KidInterface | null }> = ({ kid }) => {
  const { gonnaRegisterNewKid } = useContext(
    RegisterKidAppContext
  ) as RegisterKidAppInterfaceContext;

  return (
    <ModalRegisterKid
      open={gonnaRegisterNewKid}
      kid={kid as KidInterface}
      onNewKidSuccess={() => {}}
      titleModal="Editar niño"
    />
  );
};
