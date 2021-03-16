import React,{useContext,useEffect,useState} from 'react' 
import { View , Text,TextInput,StyleSheet,Dimensions, Pressable ,ActivityIndicator} from 'react-native'
import Modal from 'react-native-modal'
import Axios from 'axios'
import Context from '../context/store'
import COLORS from '../style/Colors'
import API from '../data/api'
import strings from '../strings'
 
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

const InputAreaModal =props=>{
    
    const [loading , setlLoading] = useState(false)
    const [visible,setVisible]=useState(true)
    const [area,setArea] = useState("")
    const {state,dispatch} = useContext(Context)

    
    
    const setLocation=async()=>{
        console.log(area,props.coordinate)
        if(area !== "" ){
            setlLoading(true)
            let response = await Axios.post(API.base_url + API.createLocation,  {
                childrenId : props.childrendId ,
                name : area,
                longitude : props.coordinate.longitude ,
                latitude : props.coordinate.latitude,
            },{
                headers : { 
                     'Authorization': `bearer ${state.token}`
                    }
            })
            console.log(response.data)
            dispatch({type : "SET_AREA" , area : response.data.data.response})
            
            setlLoading(false)
            setVisible(!visible)
        }else {
            setlLoading(false)
            alert(strings.enterAreaName)
        }
       
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
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{strings.inputAreaText}</Text>
                </View>
               <View style={{flexDirection : "row" }}>

                    <View style={styles.inputContainer}> 
                        <TextInput 
                            placeholder={strings.changearea}
                            onChangeText={(text)=>setArea(text)}
                            value={area}
                            style={{color : COLORS.black}}
                        />
                    </View>
                   {loading ?   
                        <ActivityIndicator style={{marginLeft: 5}} color={COLORS.primary} size="small" />
                   :
                   <Pressable onPress={setLocation}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.title}>{strings.save}</Text>
                        </View>
                    </Pressable>}
                </View>

            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    container : {
        width : width * 0.9,
        height : 250,
        backgroundColor : "rgba(255,255,255,0.4)",
        alignItems : "center",
        borderRadius : 20,
      
        justifyContent : "center"
        
    },
    modal : {
        alignItems : "center",
        justifyContent : "center",
        backgroundColor :"rgba(255,255,255,0)"
    },
    inputContainer : {
        width : width*0.4,
        alignItems : "center",
        backgroundColor : COLORS.white,
        height : 35,
        borderRadius : 10
    },
    buttonContainer : {
        backgroundColor : COLORS.green,
        width : width*0.3,
        paddingVertical : 5,
        alignItems : "center",
        justifyContent : "center",
        borderRadius : 10,
        marginLeft : 10
    },
    title : {
        fontSize : 16,
        fontWeight : "bold",
        color : COLORS.white
    },
    textContainer : {
        alignItems : "center",
        marginBottom : 30
        
    },
    text : {
        color : COLORS.white,
        fontSize : 16,
        fontWeight : "bold",
        marginBottom : 2,
        letterSpacing : 0.2,
        textAlign :"center"
       
    }
})

export {InputAreaModal}