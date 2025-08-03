import { io } from "socket.io-client";
const socket = io("https://serverchat-p6jr.onrender.com", {
  withCredentials: true,
  autoConnect: false,
});
export default socket;
