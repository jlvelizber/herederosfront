import { useContext } from "react";
import { AppLayout } from "../../layouts";
import { BeginRegisterAsistence, TableRegisterKid } from "../../components";
import { RegisterKidAppContext } from "../../contexts";
import { RegisterKidAppInterfaceContext } from "../../interfaces";

export const RegisterAsistencePage = () => {
  const { isRegisterInitiated } = useContext(
    RegisterKidAppContext
  ) as RegisterKidAppInterfaceContext;

  return (
    <AppLayout>
      {!isRegisterInitiated ? <BeginRegisterAsistence /> : <TableRegisterKid/>}
    </AppLayout>
  );
};
