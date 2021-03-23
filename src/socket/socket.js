import io from "socket.io-client"
import API from "../data/api"


 export const socketClient = io.connect("https://findmyfamily.app")