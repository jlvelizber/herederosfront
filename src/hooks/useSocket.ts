import { useEffect } from 'react';
import io from 'socket.io-client';
import { getEnvVariables } from '../helpers';
import { EVENTS_NAME } from '../constants';
const { VITE_API_URL } = getEnvVariables();


const socket = io(VITE_API_URL)

export const useSocket = () => {
    
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Conectado al servidor de sockets');
        });

        // return () => {
        //     socket.disconnect();
        // };
    }, []);

    const emit = (data: string, eventName = EVENTS_NAME.QR_READ) => {
        console.log(`'QR LEIDO ': ${data}`)
        socket.emit(`${eventName}`, data);
    }
    return {
        emit
    }
}