import { FC } from "react";
import { useQrScanner } from "../../hooks";

export const QRScanner: FC = () => {
  const { connectToDevice, data, port } = useQrScanner();

  const handleClick = () => {
    connectToDevice();
  };

  return (
    <div className="row p-4 bg-gray my-3">
      <h1>
        <strong>Lector de códigos: </strong>{" "}
        <strong className={!port ? "text-danger" : "text-success"}>
          {!port ? "Inactivo" : "Activo"}
        </strong>{"   "}
        {!port && <span className="underline text-xs cursor-pointer text-black font-semibold" onClick={handleClick}>[Activar]</span>}
      </h1>

      {data}
    </div>
  );
};
