import { useContext } from "react";
import { RegisterKidAppInterfaceContext } from "../../interfaces";
import { RegisterKidAppContext } from "../../contexts";

export const InfoRegisterCampusSelected = () => {
  const { campusSelected, serviceSelected } = useContext(
    RegisterKidAppContext
  ) as RegisterKidAppInterfaceContext;

  return (
    <div className="row p-4 bg-gray">
      <p>
        <strong>Campus Seleccionado: </strong>  {campusSelected?.name}
      </p>
      <p>
        <strong> Servicio Seleccionado</strong> {serviceSelected?.description}
      </p>
    </div>
  );
};
