// client/src/lib/socket.ts
import { io } from "socket.io-client";

const SERVER_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const socket = io(SERVER_URL, {
  autoConnect: false,
  auth: (cb) => {
    cb({
      token: localStorage.getItem("token"),
    });
  },
});

// Optional auto-connect based on login
export function initSocket() {
  if (localStorage.getItem("token")) {
    socket.connect();
  }
}

export default socket;
