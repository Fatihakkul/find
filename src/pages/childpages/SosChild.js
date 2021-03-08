import React, { useEffect ,useContext} from 'react' 
import { SafeAreaView , View , Text,StatusBar,Pressable} from 'react-native'
import styles from '../../style/childStyle/SosChildStyle'
import Icons from 'react-native-vector-icons/Ionicons'
import Iconss from 'react-native-vector-icons/MaterialIcons'
import COLORS from '../../style/Colors'
import Context from "../../context/store"
import { socketClient } from '../../socket/socket'
import strings from '../../strings'

const SosChild =(props)=>{

    const {state,dispatch}=useContext(Context)

    useEffect(()=>{
        socketClient.emit("sos",{
            receiverUniqueId :  state.family[0].parent.uniqueId ,
            senderUniqueId: state.user.data[0].uniqueId,
        })
    },[])

    return(
        <SafeAreaView style={{flex : 1}}>
            <StatusBar backgroundColor={COLORS.primary} />
            <View style={styles.container}>
               <View  style={styles.sosContainer}>
                   <Iconss name="online-prediction" size={70} color="white" />
                   <Text style={{fontSize : 25 ,fontWeight : "bold" , color : "white"}}>{strings.alarm}</Text>
                   <View style={[styles.sosContainer,{marginTop : 10}]}>
                       <Text style={styles.text}>{strings.alarmOneText}</Text>
                       <Text style={styles.text}>{strings.alarmTwoText}</Text>
                       <Text style={styles.text}>{strings.alarmTreeText}</Text>
                   </View>
               </View>
             
                <View>
                    <View style={{alignItems : "center" , marginTop : 30}}>
                        <Pressable onPress={()=>props.navigation.goBack()}>
                            <View style={styles.cancel}>
                                <Icons name="close" size={25} color="#ff0d00" />
                            </View>
                        </Pressable>
                        <Text style={{color : "white" , marginTop : 10}}>{strings.cancel}</Text>
                    </View>
                </View>
               
            </View>
        </SafeAreaView>
    )
}
export {SosChild}