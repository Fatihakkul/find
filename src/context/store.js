import {createContext} from 'react'

export const initialState = {
    
     message : ["eve gidiyorum" , "merhaba" , "selam" ,"okula gidiyorum" ],
     position : null,
     token : "",
     user : {},
     area : [],
     family : [],
     socket : null,
     messageList : [],
     type : null,
     location : [],
     userlight : null,
     locationHistory : [],
     login : false,
     userPackage : null
}

export default Context = createContext(initialState);