import React from 'react' 
import { Pressable,Text,View ,StyleSheet,Dimensions} from 'react-native'
import Icons from 'react-native-vector-icons/FontAwesome5'

const RecordListItem=(props)=>{
    return(
        <Pressable style={styles.container} onPress={props.onPress}>
            <View>
                <Text style={styles.date}>{props.data.date}</Text>
                <Text style={styles.title}>{props.data.title}</Text>
            </View>
            <Pressable onPress={props.delete}>
                <Icons name="trash-alt" color="#14cafc" size={20} />
            </Pressable>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container : {
        width : Dimensions.get('window').width,
        borderBottomWidth : 1,
        borderColor : "gray",
        paddingVertical : 20,
        paddingHorizontal : 15,
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems  :"center"
    },
    date : {
        fontSize : 13,
        opacity  :0.7,
        fontWeight : "400"
    },
    title : {
        fontSize : 18,
        letterSpacing : 1
    }
})
export { RecordListItem }