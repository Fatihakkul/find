import React, { useContext, useState,useEffect } from "react"
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
    TextInput,
    ImageBackground,
    Pressable,
    ActivityIndicator
} from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import COLORS from "../../style/Colors"
import Context from "../../context/store"
import Axios from "axios"
import API from "../../data/api"
import { launchImageLibrary } from "react-native-image-picker"


const { width, height } = Dimensions.get('window')

const EditUser = (props) => {

    const { state, dispatch } = useContext(Context)
    const [number,setNumber] = useState()
    const [photo , setPhoto] = useState(null)
    const [picture,setPicture]=useState(null)
    const [loading,setLoading]=useState(false)

    useEffect(()=>{
            setNumber(state.user.userData[0].number)
            //console.log(state.user.userData[0].family.parents[0].id)
    },[])


    const saveUpdate =async()=>{
        setLoading(true)
        let upload = await Axios.post(API.base_url+"/home" + API.update_user, {
            role : "parent",
            id :state.type === 0 ?state.user.userData.id : state.user.userData[0].family.parents[0].id,
            picture : `http://yatoo.demeli.org/uploads/${photo.data}`
        })
        let user = await Axios.post(API.base_url+API.get_user,{
            id :state.type === 0 ?state.user.userData.id : state.user.userData[0].family.parents[0].id,
            role : "parent"
        })
        dispatch({type : "SET_USERLIGHT" , userlight : user.data})
        console.log("response", upload.data.responseStatus)
        if(upload.data.responseStatus === 200){
            setLoading(false)
            props.navigation.goBack()
        }else {
            alert("Fotoğraf yüklenirken hata oluştu")
            setLoading(false)
        }
        setLoading(false)
        
    }
 
   async function uploadImage (){
       const data = new FormData()
       
        launchImageLibrary({
            mediaType: 'photo',

        }, async (responese) => {
            console.log(responese)
            data.append("image",{
                uri : responese.uri,
                name : responese.fileName,
                type : responese.type
            })
            let respone = await Axios.post(API.add_content,data)
            setPicture(responese)
            setPhoto(respone)
        })

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header}>
                <Icon onPress={() => props.navigation.goBack()} name="arrow-back-outline" size={25} color={COLORS.settinText} />
                <Text style={styles.title}>HESABIM</Text>
            </View>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: "center", paddingTop: 20 }}>
                <View style={styles.image}>
                    <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={state.type === 0 ? require('../../assets/child.jpg')   : picture != null ?   {uri : picture.uri}    :  state.user.userData[0].family.parents[0].picture != undefined && picture === null ?{ uri :state.user.userData[0].family.parents[0].picture} :state.userlight != null && state.userlight.data.response.picture != null ? {uri :state.userlight.data.response.picture } :  require('../../assets/child.jpg')} />
                    <Icon style={{ position: "absolute", top: 70, zIndex: 1, left: 70 }} name="construct" size={30} onPress={()=>uploadImage()} color={COLORS.lightGreen} />
                </View>
                <View style={{marginTop : 40}}>
                    <View style={styles.info}>
                        <Text style={styles.infoText}>{state.type === 1 ? state.user.userData[0].name : state.user.userData.name}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.infoText}>{state.type === 1 ? state.user.userData[0].email : state.user.userData.email}</Text>
                    </View>
                    <View style={[styles.info,{paddingVertical:0,height:40}]}>
                        <TextInput
                            value={number}
                            placeholderTextColor={COLORS.settinText}
                            style={{color :COLORS.settinText,fontWeight:"bold",fontSize : 16}}
                            onChangeText={(text)=>setNumber(text)}
                        />
                    </View>
                    
                </View>
                <View style={styles.package}>
                        <Text style={[styles.update,{color : COLORS.settinText,fontSize:16}]}>PAKETİM : PREMIUM</Text>
                        <Pressable onPress={()=>props.navigation.navigate("package")}>
                            <ImageBackground style={{ width: 100, height: 35, alignItems: "center", justifyContent: "center", borderRadius: 20, overflow: "hidden" }} source={require('../../assets/updateprice.png')}>
                                <Text style={styles.update}>PAKETİ YÜKSELT</Text>
                            </ImageBackground>
                        </Pressable>
                       
                </View>
                <View style={{width:width,alignItems:"center",marginTop:40}}>
                   {loading ? <ActivityIndicator color={COLORS.primary} size={"large"} /> :
                    <Pressable onPress={saveUpdate}>
                        <View style={styles.button}>
                            <Text style={{color :COLORS.white,fontWeight:"bold",fontSize:16,letterSpacing:1}}>KAYDET</Text>
                        </View>
                    </Pressable>}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    button : {
        width:width*0.6,
        backgroundColor : COLORS.lightGreen,
        alignItems:"center",
        justifyContent:"center",
        paddingVertical:10,
        borderRadius:15
    },
    update : {
        fontSize : 10,
        fontWeight:"bold",
        color : COLORS.white
    },
    package : {
        backgroundColor : COLORS.white,
        width:width*0.9,
        paddingVertical:10,
        borderRadius:20,
        marginTop:50,
        flexDirection : "row",
        justifyContent : "space-around",
        alignItems:"center"
    },
    infoText : {
        color : COLORS.settinText,
        fontSize : 17,
        fontWeight  :"bold"
    },
    info : {
        justifyContent : "center",
        marginTop : 15,
        width:width*0.8,
        alignItems:"flex-start",
        borderWidth:1,
        borderColor : COLORS.settinText,
        paddingVertical:7,
        paddingLeft : 20
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    header: {
        width: width,
        height: 60,
        backgroundColor: COLORS.white,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 15,
        elevation: 10
    },
    title: {
        color: COLORS.settinText,
        fontSize: 17,
        fontWeight: "bold",
        letterSpacing: 1,
        marginLeft: 20
    },
})
export { EditUser }