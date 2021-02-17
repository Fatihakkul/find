import React,{useState,useContext} from 'react' 
import { Text , View ,TextInput,StyleSheet,Dimensions, Pressable} from 'react-native'
import Modal from 'react-native-modal'
import Context from '../context/store'
import COLORS from '../style/Colors' 

const width = Dimensions.get('window').width

const ChildMessageModal =(props)=>{

    const {state,dispatch}=useContext(Context)
    const [value,setValue]=useState('')
    const [visible,setVisible]=useState(true)
    
    const setContextData =()=>{
        dispatch({type : "SET_MESSAGE" , message : value})
        setVisible(!visible)
    }

    return(
        <Modal
            isVisible={ props.isVisible === visible ? true : false}
            onBackdropPress={props.onBackdropPress}
            style={styles.modal}
            animationInTiming={400}
            animationOutTiming={800}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Find My Kids</Text>
                <View style={{alignItems : "center",marginBottom : 20}}>
                    <Text style={styles.text}>Listeye eklemek için hızlı</Text>
                    <Text style={styles.text}>bir mesaj gir</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput 
                        placeholder="bir şeyler yaz..."
                        multiline = {true}
                        style={{width : width*0.7}}
                        onChangeText={(text)=>setValue(text)}
                    />
                </View>
                <View style={styles.buttonsContainer}>
                    <Pressable style={[styles.button,{borderWidth : 1}]} onPress={props.cancel}> 
                        <Text style={[styles.text,{color : COLORS.primary}]}>İptal</Text>
                    </Pressable>
                    <Pressable style={[styles.button,{backgroundColor : COLORS.green}]} onPress={setContextData}>
                        <Text style={[styles.text,{color :COLORS.white}]}>Kaydet</Text>
                    </Pressable>
                </View>
            </View>

        </Modal>
    )
}
const styles = StyleSheet.create({
    container : {
        width : width*0.85,
        height :270,
        backgroundColor :COLORS.white,
        borderRadius : 10,
        alignItems : "center",
        paddingTop : 15
       
    },
    modal : {
        alignItems : "center",
        justifyContent : "center"
    },
    inputContainer : {
        backgroundColor : COLORS.gray,
        width : width*0.75,
        borderRadius : 10,
        paddingLeft : 15,
        height : 40,
        justifyContent : "center",
        marginBottom : 30
    },
    title : {
        color : COLORS.primary,
        fontSize : 25,
        fontWeight : "bold",
        marginBottom : 15
    },
    text : {
        fontSize : 18,
        letterSpacing : 0.7
    },
    buttonsContainer : {
        width : "100%",
        flexDirection : "row",
        justifyContent : "space-around",
      
    },
    button : {
        width : width*0.35,
        paddingVertical : 5,
        borderRadius : 10,
        borderColor : COLORS.primary,
        alignItems : "center",
        justifyContent : "center"
    }
})
export {ChildMessageModal}