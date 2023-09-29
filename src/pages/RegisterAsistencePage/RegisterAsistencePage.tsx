import { useContext } from "react";
import { AppLayout } from "../../layouts";
import { BeginRegisterAsistence } from "../../components";
import { RegisterKidAppContext } from "../../contexts";
import { RegisterKidAppInterfaceContext } from "../../interfaces";

export const RegisterAsistencePage = () => {
  const { isRegisterInitiated } = useContext(
    RegisterKidAppContext
  ) as RegisterKidAppInterfaceContext;

  return (
    <AppLayout>
      {!isRegisterInitiated ? <BeginRegisterAsistence /> : <h1>Hollaaaaaa</h1>}
    </AppLayout>
  );
};
