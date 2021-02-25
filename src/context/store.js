import {createContext} from 'react'

export const initialState = {
    
     message : ["eve gidiyorum" , "merhaba" , "selam" , "sadfasd","asdfsdf","asdfsdf","asdfsdf","eve gidiyorum" ],
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
     login : false
}

export default Context = createContext(initialState);