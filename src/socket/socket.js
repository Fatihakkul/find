import io from "socket.io-client"


 export const socketClient = io.connect("https://wherismykid.herokuapp.com")