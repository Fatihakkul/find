import React,{useEffect,useState,useContext} from 'react'
import { SafeAreaView,View,Text ,Pressable,PermissionsAndroid,Image,TouchableOpacity,ImageBackground,Platform, Dimensions, Alert ,Linking} from 'react-native'
import Context from '../context/store'
import styles from '../style/ChooseStyle'
import Geolocation from '@react-native-community/geolocation'
import AsyncStoreage from '@react-native-async-storage/async-storage'
import jwt_decoded from 'jwt-decode'
import COLORS from '../style/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'





const { width,height}= Dimensions.get('window')

const Choose = props => {

    const {state,dispatch}=useContext(Context)
    const [position,setPosition]=useState([])
  
    useEffect(()=>{
      AsyncStoreage.clear().then(() => console.log("success"))
      getLocation()
    },[])
    // useEffect(()=>{
    //     getLocation()
    //     AsyncStoreage.getItem("@TYPE").then(data=>{
    //       dispatch({type : "SET_TYPE" , tip : data})
    //     })
    //     AsyncStoreage.getItem("@TOKEN").then(data=>{
    //       console.log(data,"token")
    //       if(!data){
    //         console.log("data yok")
    //         getLocation()
    //       }else {
    //         console.log("-else yok")
    //         AsyncStoreage.getItem("@TYPE"  ).then((type)=>{
    //             console.log(type,"datalogin")
    //             const user = jwt_decoded(data)
    //             dispatch({type : "SET_TYPE" , tip : type})
    //             dispatch({type : "SET_USER" ,   user : user})
    //             dispatch({type : "SET_TOKEN" ,   token : data })
    //             console.log(user,"user")
    //             if( user.userData[0].user_role.roleName === "user_parent"){
                  
    //               props.navigation.navigate("bottomtab")
    //             }
    //             if(user.data[0].parentId != undefined) {
    //               console.log("en alt else")
    //               getLocation()
    //               props.navigation.navigate("Child")
    //             }
    //         })
            
    //       }
    //    })
        
    // },[])

    const getLocation=async()=>{
        try {
            const granted =Platform.OS === "android" ?  await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: "Cool Photo App Camera Permission",
                message:
                  "Cool Photo App needs access to your camera " +
                  "so you can take awesome pictures.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
              }
            ) : true
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
               Geolocation.watchPosition(position => {
                    const lastPosition = JSON.stringify(position);
                   setPosition(lastPosition)
                //   console.log(lastPosition ,"last")
                  })
                
                Geolocation.getCurrentPosition(info =>{
                  console.log(info)
                   dispatch({type : "SET_POSITION" , position : info.coords})
                  },(err)=>{
                    console.log(err, "error")
                   
                    Alert.alert(
                      'KONUM HATASI', 
                      'Uygulamaya devam edebilmek için konumunuz açık ve uygulamaya izin verilmiş olmalı.',
                      [
                          
                          {
                              text: 'Ayarlara git', 
                              onPress: () => Linking.openSettings(),
                              style: 'default'
                          },
                      ]
                  );
                  });
            } else {
              console.log("Camera permission denied");
            }
          } catch (err) {
            console.warn(err);
          }
    }
    
     return(
          <SafeAreaView style={styles.container}>
               
                  <Pressable style={styles.buttons} onPress={()=>props.navigation.navigate("Parent")}>
                     <Image  style={{width :width*0.7,resizeMode : "contain" , height : height*0.35}} source={require('../assets/Family.png')} />
                  </Pressable>
                  <Pressable style={styles.buttons} onPress={()=>props.navigation.navigate("Child",{position : position})}>
                  <Image style={{width :width*0.7,resizeMode:"contain" , height : height*0.35}} source={require('../assets/Childanime.png')} />
                  </Pressable>
    
             
          </SafeAreaView>
     )
}
export { Choose } 