import React from "react"
import {View , Image} from "react-native"


const MyCustomMarker =(props)=>{
    return(
        <View style={{alignItems:"flex-end",justifyContent:"flex-end" , height:100}}>
            {console.log(props.item != undefined && props.item != null ? {uri : props.item.picture} : require('../assets/child.jpg'))}
            <View style={{ position:"absolute",top:28,zIndex :2,right:17,height : 44,width : 44,borderRadius: 22,overflow: "hidden"}}>
                <Image style={{height: 45, width:45 }} source={props.item != undefined && props.item != null ? {uri : props.item.picture} : require('../assets/child.jpg')} />
            </View>
            <Image style={{width : 78,height : 78}} source={require('../assets/red.png')} />
        </View>
    )
}
export {MyCustomMarker}