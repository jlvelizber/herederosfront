import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { getEnvVariables } from '../helpers';
import { EVENTS_NAME } from '../constants';
const { VITE_SOCKET_API_URL } = getEnvVariables();


const socket = io(VITE_SOCKET_API_URL)

export const useSocket = () => {

    const [eventEmitData, setEventEmitData] = useState<{ name: string, data: unknown }>({
        name: '',
        data: ''
    });

    const [dataOnEvent, setDataOnEvent] = useState<{ name: string, data?: unknown }>();

    socket.on('connection', () => console.log('conectado'))
    useEffect(() => {

        if (eventEmitData.name) {
            socket.emit(eventEmitData.name, eventEmitData.data);
        }


        socket.on(`${EVENTS_NAME.QR_EXIST_KID}`, (kid) =>
            setDataOnEvent({ name: `${EVENTS_NAME.QR_EXIST_KID}`, data: kid })
        );
        socket.on(`${EVENTS_NAME.QR_NOT_EXIST_KID}`, (kid) =>
            setDataOnEvent({ name: `${EVENTS_NAME.QR_NOT_EXIST_KID}`, data: kid })
        );

    }, [eventEmitData]);


    const emitSocket = (name: string = EVENTS_NAME.QR_READ, data: unknown) => {

        setEventEmitData({
            name,
            data
        })
    }
    return {
        emitSocket,
        dataOnEventSocket: dataOnEvent
    }
}