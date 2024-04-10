import { FC, useEffect } from "react";
import { useQrScanner, useSocket } from "../../hooks";
import { EVENTS_NAME } from "../../constants";


export const QRScanner: FC = () => {
  const { connectToDevice, data, port } = useQrScanner();
  const { emitSocket, eventOnData } = useSocket();

  const handleClick = () => {
    connectToDevice();
  };

  useEffect(() => {
    emitSocket(`${EVENTS_NAME.QR_READ}`, data.replace(/\r\n/g, "").trim());
  }, [data]);

  useEffect(() => {
    console.log(eventOnData);
  }, [eventOnData]);

  return (
    <div className="row p-4 bg-gray my-3">
      <h1>
        <strong>Lector de códigos: </strong>{" "}
        <strong className={!port ? "text-danger" : "text-success"}>
          {!port ? "Inactivo" : "Activo"}
        </strong>
        {"   "}
        {!port && (
          <span
            className="underline text-xs cursor-pointer text-black font-semibold"
            onClick={handleClick}
          >
            [Activar]
          </span>
        )}
      </h1>
    </div>
  );
};
