import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = `${
  process.env.REACT_APP_VERCEL_ENV === "preview"
    ? process.env.REACT_APP_VERCEL_URL
    : process.env.REACT_APP_SOCKET_SERVER_HOST
}:${process.env.REACT_APP_SOCKET_SERVER_PORT}`;

let socket: Socket | null = null;

export const initializeSocket = (enabled: boolean): Socket | null => {
  if (enabled && !socket) {
    socket = io(undefined);
  }
  return socket;
};

export const getSocket = (): Socket | null => socket;
