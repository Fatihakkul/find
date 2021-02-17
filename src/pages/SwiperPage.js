import React,{useRef , useEffect ,useContext} from "react" 
import { SafeAreaView , View ,Text ,StyleSheet, Pressable, Dimensions , Platform, PermissionsAndroid,Image} from "react-native"
import Swiper from "react-native-swiper"
import LottieView from "lottie-react-native"
import COLORS from "../style/Colors"
import Context from "../context/store"
import ImagePicker from "react-native-image-picker"


const {width,height} = Dimensions.get('window')

const SwiperPage =(props)=>{
    
    const {state,dispatch}=useContext(Context)
    useEffect(()=>{
     Platform.OS === "android" ? requestCameraPermission() : null
    },[])

    
    const getImage =()=>{
      ImagePicker.showImagePicker((response) => {
        console.log('Response = ', response);
       
        if (response.didCancel) {
          console.log('User cancelled image picker')
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error)
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton)
        } else {
          const source = response.uri 
            setImg(source)
        }})
    }


    const requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
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
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera");
          } else {
            console.log("Camera permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      };

    const swiper = useRef()

    return(
        <View style={{flex : 1}}>
          <Image style={{width : width,height : height ,zIndex : 0,position :"absolute" }} source={require('../assets/background.png')} />
        <Swiper ref={swiper} style={styles.wrapper} showsButtons={false} showsPagination={true} dotColor={COLORS.demoPrimary} activeDotColor={COLORS.demoSecondary}    >
                <View style={styles.slide1}>    
                    <View style={styles.lottieConatiner}>
                        <LottieView
                                source={require('../lottie/register.json')}
                                autoPlay
                                loop
                                style={{
                                    width: 200, 
                                    height: 200, 
                                   
                                }}
                            />
                           
                    </View>
                    <Text style={styles.title}>ÜYE OL</Text>
                    <View style={styles.textContainer}>
                        <Text style={styles.descriptions}>GOOGLE FACEBOOK</Text>
                        <Text style={styles.descriptions}>VEYA  TELEFON</Text>
                        <Text style={styles.descriptions}>NUMARAN İLE ÜYE OL</Text>
                        <Text style={styles.descriptions}>ÇOCUKLARINI TAKİP </Text>
                        <Text style={styles.descriptions}>ETMEYE BAŞLA</Text>
                    </View>
                    <Pressable style={styles.buttons} onPress={() =>swiper.current.scrollBy(1) } >
                        <Text style={{color : COLORS.white}}>NEXT</Text>
                    </Pressable>
                </View>
                <View style={styles.slide2}>
                        <View style={styles.lottieConatiner}>
                            <LottieView
                                    source={require('../lottie/family.json')}
                                    autoPlay
                                    loop
                                    style={{
                                        width: 200, 
                                        height: 200, 
                                        
                                    }}
                                />
                        </View>
                        <Text style={styles.title}>DAİMA SENLE</Text>
                        <View style={styles.textContainer}>
                            <Text style={styles.descriptions}>AİLENE ÜYE EKLEMEK İÇİN</Text>
                            <Text style={styles.descriptions}>ALACAĞIN KODU AİLE</Text>
                            <Text style={styles.descriptions}>ÜYESİNİN TELEFONUNDAKİ</Text>
                            <Text style={styles.descriptions}> UYGULAMAYA GİR</Text>
                            <Text style={styles.descriptions}>TEBRİKLER !!!</Text>
                            <Text style={styles.descriptions}>AİLEN ARTIK HEP SENİNLE </Text>
                        </View>
                        <Pressable style={styles.buttons} onPress={() =>swiper.current.scrollBy(1) } >
                            <Text style={{color : COLORS.white}}>NEXT</Text>
                        </Pressable>
                </View>
                <View style={styles.slide3}>
                        <View style={styles.lottieConatiner}>
                            <LottieView
                                    source={require('../lottie/phone.json')}
                                    autoPlay
                                    loop
                                    style={{
                                        width: 200, 
                                        height: 200, 
                                    
                                    }}
                                />
                        </View>
                        <Text style={styles.title}>HIZLI İLETİŞİM</Text>
                        <View style={styles.textContainer}>
                            <Text style={styles.descriptions}>SOS BİLDİRİMLERİ VE</Text>
                            <Text style={styles.descriptions}>HIZLI MESAJLAR İLE</Text>
                            <Text style={styles.descriptions}>SÜREKLİ AİLENLE İLETİŞİM</Text>
                            <Text style={styles.descriptions}> HALİNDE OL </Text>
                           
                        </View>
                        <Pressable style={styles.buttons} onPress={() =>props.navigation.navigate('Choose') } >
                            <Text style={{color : COLORS.white}}>NEXT</Text>
                        </Pressable>
                </View>
        </Swiper>
       
       
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
      flex : 1,
      paddingTop : 20,
      alignItems: 'center',
      justifyContent : "space-around"
      
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
     
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
     
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    },
    pagination : {
        
        color  :"red"
    },
    title  :{
        color : COLORS.demoPrimary,
        fontSize : 30,
        fontWeight : "bold",
       //  fontFamily:"Montserrat-Regular"
    },
    descriptions : {
        fontSize : 20,
        letterSpacing : 1,
        color : COLORS.black,
        opacity : 0.5,
        marginTop : 5,
     
    },
    textContainer : {
        alignItems : "center",
        marginTop : 20,
        marginBottom : 20
    },
    buttons : {
        width : 269,
        height : 44 ,
        alignItems : "center",
        justifyContent : "center",
        backgroundColor : COLORS.demoPrimary,
        borderRadius : 22,
        marginBottom : 20
    }
  })
export { SwiperPage }