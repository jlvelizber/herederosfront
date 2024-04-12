import { FC, useContext, useEffect } from "react";
import { useKidRegister, useQrScanner, useSocket } from "../../hooks";
import { EVENTS_NAME } from "../../constants";
import { KidInterface, RegisterKidAppInterfaceContext } from "../../interfaces";
import { RegisterKidAppContext } from "../../contexts";

export const QRScanner: FC = () => {
  const { connectToDevice, dataScanned, port } = useQrScanner();
  const { emitSocket, dataOnEventSocket } = useSocket();
  const { saveRegisterKid } = useKidRegister();
  const { addKIdToRegisterKids, setExistAnyResultQueryKids } = useContext(
    RegisterKidAppContext
  ) as RegisterKidAppInterfaceContext;

  const handleClick = () => {
    connectToDevice();
  };

  useEffect(() => {
    emitSocket(
      `${EVENTS_NAME.QR_READ}`,
      dataScanned.replace(/\r\n/g, "").trim()
    );
  }, [dataScanned]);

  useEffect(() => {
    // verificamos si niño existe
    if (dataOnEventSocket?.name == EVENTS_NAME.QR_EXIST_KID) {
      // si existe envia a registrar
      handleSelectKid(dataOnEventSocket.data as KidInterface);
    } else if (dataOnEventSocket?.name == EVENTS_NAME.QR_NOT_EXIST_KID) {
      // muestra si desea registrar
      setExistAnyResultQueryKids(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataOnEventSocket]);

  const handleSelectKid = async (kid: KidInterface) => {
    const kidRegister = localStorage.getItem("kidRegister");

    if (kidRegister) {
      const dataJSON = JSON.parse(kidRegister);

      const params = {
        register_user_id: 1,
        kid_id: kid?.id as string,
        service_id: dataJSON.service?.id as string,
      };

      const register = await saveRegisterKid(params);
      if (register) addKIdToRegisterKids(kid);
    }
  };

  return (
    <div className="row p-4 bg-gray my-3">
      <h1>
        <strong>Lector de códigos: </strong>{" "}
        <strong className={!port ? "text-danger" : "text-success"}>
          {!port ? "Inactivo" : "Activo"}
        </strong>
        {!port && (
          <>
            {" "}
            <span
              className="underline text-xs cursor-pointer text-black font-semibold"
              onClick={handleClick}
            >
              [Activar]
            </span>
          </>
        )}
      </h1>
    </div>
  );
};
