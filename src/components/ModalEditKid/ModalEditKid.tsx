import { FC, useContext } from "react";
import { ModalRegisterKid } from "../";
import { KidInterface, RegisterKidAppInterfaceContext } from "../../interfaces";
import { RegisterKidAppContext } from "../../contexts";

export const ModalEditKid: FC<{ kid: KidInterface | null; title: string; onSuccessUpdatedKid: () => void }> = ({
  kid,
  title,
  onSuccessUpdatedKid
}) => {
  const { gonnaEditKid } = useContext(
    RegisterKidAppContext
  ) as RegisterKidAppInterfaceContext;

  return (
    gonnaEditKid && (
      <ModalRegisterKid
        open={gonnaEditKid}
        kid={kid as KidInterface}
        onNewKidSuccess={onSuccessUpdatedKid}
        titleModal={title}
      />
    )
  );
};
