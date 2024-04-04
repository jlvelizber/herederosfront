// Definición de tipos para la API Web Serial
export interface SerialPort extends EventTarget {
    readonly readable: ReadableStream<Uint8Array>;
    readonly writable: WritableStream<Uint8Array>;
    close(): Promise<void>;
    open(options?: SerialOptions): Promise<void>;
}

interface SerialOptions {
    baudRate?: number;
    bufferSize?: number;
}
