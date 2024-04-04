import { useState } from "react";
import { SerialPort } from "../interfaces";


export const useQrScanner = () => {

    const [port, setPort] = useState<SerialPort | null>(null);
    const [data, setData] = useState<string>("");

    const connectToDevice = async () => {
        try {
            // Solicitar permiso para acceder al puerto serie

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            const port = await navigator.serial.requestPort();
            await port.open({ baudRate: 9600 });
            setPort(port);

            // Leer datos del puerto serie
            const reader = port.readable.getReader();
            // eslint-disable-next-line no-constant-condition
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                const textDecoder = new TextDecoder();
                const decodedValue = textDecoder.decode(value);
                setData((prevData) => prevData + decodedValue);
            }
        } catch (error) {
            console.error("Error al conectar al dispositivo:", error);
        }
    };
    console.log(port)
    return {
        connectToDevice,
        data,
        port
    }
}