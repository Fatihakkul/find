import React,{useContext,useEffect,useState} from 'react' 
import { SafeAreaView,View,Text ,StyleSheet,Dimensions, Image, Pressable} from 'react-native'
import Context from "../../context/store"
import COLORS from '../../style/Colors'
import AsyncStoreage from "@react-native-async-storage/async-storage"

const {width,height} =Dimensions.get('window')
const SettingsChild =props=>{

    const {state,dispatch} = useContext(Context)
    const [code,setCode]=useState()

    useEffect(()=>{
        console.log(state.family)
        setCode(state.user.data[0].code)
    },[])


    const logout = async () => {
        try {
            await AsyncStoreage.clear().then(() => console.log("success"))
            //  GoogleSignin.revokeAccess();
            //  GoogleSignin.signOut();

            props.navigation.navigate("Choose")

        } catch (error) {
            console.log(error)
        }



    }
    return(
        <SafeAreaView style={{flex  :1}}>
            <View style={styles.container}>
                <View style={{width : width,marginVertical:15}}>
                    <Text style={styles.title}>HESABIM</Text>
                </View>
                <View style={styles.account}>
                    <View style={styles.imageCont}>
                     <Image  style={{width: 70,height:70}} source={state.user.data[0].picture != null ||state.user.data[0].picture != undefined?{  uri :state.user.data[0].picture } :require('../../assets/childface.png')} />
                    </View>
                    <View style={{marginLeft :10,height:"100%"}}>
                        <Text style={[styles.title,{color :COLORS.black}]}>{state.user.data[0].name}</Text>
                        <Text style={[styles.title,{fontWeight : "700"}]}>{`code : ${code != undefined ? code : ""}`}</Text>
                    </View>
                </View>
                <View style={{width : width,marginVertical:15}}>
                    <Text style={styles.title}>DESTEK</Text>
                </View>
                <View style={styles.support}>
                    <Text style={styles.setting}>FAQ</Text>
                    <Text style={styles.setting}>TERMS OF SERVİCE</Text>
                    <Text style={styles.setting}>CONTACT</Text>
                </View>
                <Pressable onPress={logout}>
                    <View style={styles.support}>
                        <Text style={styles.setting}>Log Out</Text>
                    
                    </View>
                </Pressable>
                
            </View>
        </SafeAreaView>
    )
}

const styles =StyleSheet.create({
    setting : {
        fontSize : 17,
        color :COLORS.settinText,
        letterSpacing:0.4,
        fontWeight  :"bold",
        marginTop : 10
    },
    support : {
        paddingHorizontal : 20,
        backgroundColor : COLORS.white,
        borderRadius: 15,
        width : width*0.95,
        marginTop : 20,
        paddingVertical:25,
        justifyContent : "space-between"
    },
    account:  {
        flexDirection : "row",
        alignItems : "center",
        backgroundColor  :COLORS.white,
        width : width*0.94,
        borderRadius : 15,
        paddingVertical : 25,
        paddingHorizontal : 10
    },
    imageCont : {
        width: 70,
        height  :70,
        borderRadius : 35,
        overflow :"hidden"
    },
    container : {
        flex : 1,
        alignItems : "center"
    },
    title : {
        fontSize : 18,
        fontWeight : "bold",
        color :COLORS.settinText,
        marginLeft  :10,
        marginTop : 10
    }
})
export {SettingsChild}