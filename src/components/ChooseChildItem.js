import React from  "react"
import { TouchableOpacity ,Text,View, StyleSheet,Dimensions} from "react-native"
import Colors from '../style/Colors'
import MapView,{Marker} from 'react-native-maps'
import Icons from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/Ionicons'
import customStyle from "../style/MapCustomStyle"

const width = Dimensions.get("window").width

const ChooseChildItem =props=>{
    return(
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.container}>
              
              <MapView 
                
                
                //customMapStyle={customStyle}
                scrollEnabled={false}
                zoomEnabled={false}
                pitchEnabled={false}
                rotateEnabled={false}
                style={{width : width*0.9 , height : 180,position : "absolute"}}
                initialRegion={{
                    latitude:  37.8025259,
                    longitude:  -122.4351431,
                    latitudeDelta: 0.0022,
                    longitudeDelta: 0.0021,
                }}
              >
                  <Marker 
                  
                  coordinate={{
                    latitude :37.8025259 ,
                    longitude :-122.4351431
                }}
                  
                  />
              </MapView>
              <View style={styles.info}>
                    <View style={styles.infoContainer}>
                        <Text>{props.data.name}</Text>
                        <View style={styles.bateryRow}>
                            <Text style={styles.text}>%10</Text>
                            <Icons name="battery-three-quarters" size={18} color={Colors.transparentBlack}  />
                            
                        </View>
                    </View>
                    <View style={{width : width*0.85 , borderWidth : 0.5,borderColor : Colors.primary}}></View>
                    <View style={{flexDirection : "row" , justifyContent : "center" , paddingTop : 5}}>
                        <Icon name="alert" size={18} color={Colors.red} />
                        <Text style={{color : Colors.red ,fontSize : 14}}>Çocuğun şarjı %10</Text>
                    </View>
              </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container : {
        width : width*0.9,
        height : 180,
        backgroundColor : Colors.primary,
        borderRadius : 20,
        alignItems : "center",
        overflow : "hidden",
        elevation : 1,
        marginTop : 10
    },
    info : {
        position : "absolute",
        width : width*0.85,
        height : 70,
        backgroundColor : Colors.transparentWhite,
        bottom : 10,
        borderRadius : 5,
       
    },
    bateryRow : {
        flexDirection : "row",
    },
    text : {
        fontSize : 14,
        marginRight : 5
    },
    infoContainer : {
        flexDirection : "row",
        padding : 10,
        justifyContent : "space-between",
        
    }
})
export {ChooseChildItem}