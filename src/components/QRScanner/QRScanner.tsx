import { FC, useEffect } from "react";
import { useQrScanner } from "../../hooks";
import io from "socket.io-client";
import { EVENTS_NAME } from "../../constants";

const socket = io("http://localhost:3000");

export const QRScanner: FC = () => {
  const { connectToDevice, data, port, setData } = useQrScanner();
  // const { emit } = useSocket();

  const handleClick = () => {
    connectToDevice();
  };

  useEffect(() => {
    socket.emit(`${EVENTS_NAME.QR_READ}`, data.replace(/\r\n/g,"").trim());
    socket.on(`${EVENTS_NAME.QR_EXIST_KID}`, (kid) => console.log('existe',kid));
    socket.on(`${EVENTS_NAME.QR_NOT_EXIST_KID}`, (kid) => console.log('no existe',kid));

   
  }, [socket, data]);

  // useEffect(() =>  { return () => setData("")}, [data])
  

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
      {data}
    </div>
  );
};
