export function reducer(state, action) {
    switch (action.type) {
        case "SET_MESSAGE":
            const value = action.message
            console.log(value, "mess")
            let newList = state.message
            newList.push(value)
            state.message = newList
            return { ...state }
        case "SET_LIST":
            const list = action.list
            console.log(list, "mess")

            state.messageList = [...list]
            return { ...state }
        case "SET_POSITION":
            const position = action.position
            state.position = position

            return { ...state }
        case "SET_TOKEN":
            const token = action.token
            state.token = token
            return { ...state }
        case "SET_USER":
            const user = action.user
            state.user = user

            return { ...state }
        case "SET_AREA":
            const arealist = [...state.area]
            const area = action.area
            arealist.push(area)
            state.area = arealist

            return { ...state }
        case "ADD_AREA":
            const added = action.get
            state.area = added
            return { ...state }
        case "DELETE_AREA":
            let areaList = [...state.area]
            const deleted = action.delete
            const filteredList = areaList.filter(item => {
                return item.id != deleted.id
            })
            console.log("delete")
            state.area = filteredList
            return { ...state }
        case "SET_FAMILY":
            const family = action.family
            state.family = family

            return { ...state }
        case "SET_SOCKET":
            const socket = action.socket
            state.socket = socket

            return { ...state }
        case "SET_MESSAGELIST":
            const newMessage = action.messageList
            console.log("me", newMessage)
            const messageList = [...state.messageList]
            messageList.push(newMessage)
            //  messageList =  messageList.concat(newMessage)
            state.messageList = messageList

            return { ...state }
        case "SET_TYPE":
            const type = action.tip
            console.log(type, "reducer type")
            state.type = parseInt(type)
            return { ...state }

        case "SET_LOCATION":
            const location = action.location
            console.log(location, "loc")
            const locationList = [...state.location]
            locationList.push(location)
            state.location = locationList
            console.log(locationList, "list")
            return { ...state }


        case "SET_NEWCHILD":
            const newChild = action.newchild
            const copyFamily = [...state.family]
            copyFamily.push(newChild)
            state.family = copyFamily
            return { ...state.family }
        case "SET_USERLIGHT":
            const userlight = action.userlight
            state.userlight = userlight
            return { ...state }
        case "SET_LOCATIONHISTORY":
            const locationHistory = action.locationHistory
            state.locationHistory = locationHistory
            return { ...state }
        default:
            return state
    }
}