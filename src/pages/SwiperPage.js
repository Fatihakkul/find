import React, { useRef, useEffect, useContext } from "react"
import { SafeAreaView, View, Text, StyleSheet, Pressable, Dimensions, Alert, Platform, PermissionsAndroid, Image } from "react-native"
import Swiper from "react-native-swiper"
import LottieView from "lottie-react-native"
import COLORS from "../style/Colors"
import Context from "../context/store"
import ImagePicker from "react-native-image-picker"
import strings from "../strings"

const { width, height } = Dimensions.get('window')

import { Constants } from 'react-native-unimodules';





const SwiperPage = (props) => {

  const { state, dispatch } = useContext(Context)
  useEffect(() => {
    Platform.OS === "android" ? requestCameraPermission() : null
    console.log(strings.getInterfaceLanguage())
    //de-DE  tr-TR 
    

    console.log('=====ZZZZZZZ', Constants.systemFonts);
  }, [])



  const getImage = () => {
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
      }
    })
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

  return (
    <View style={{ flex: 1 }}>
      <Image style={{ width: width, height: height, zIndex: 0, position: "absolute" }} source={require('../assets/background.png')} />
      <Swiper ref={swiper} style={styles.wrapper} showsButtons={false} showsPagination={true} dotColor={COLORS.demoPrimary} activeDotColor={COLORS.demoSecondary}    >
        <View style={[styles.slide1, { justifyContent: "center" }]}>

          {/* <LottieView
              source={require('../lottie/family.json')}
              autoPlay
              loop
              style={{
                width: 200,
                height: 200,

              }}
            /> */}
          <Image style={{ width: width, height: height * 0.33, resizeMode: "cover", position: "absolute", top: 0, right: 0 }} source={require('../assets/slideone.png')} />
          <View style={{ alignItems: "center", marginTop: 70 }}>


            <Text style={styles.title}>Sevdiklerinizin nerede olduğunu </Text>
            <Text style={styles.title}>her an görün</Text>





            <View style={styles.textContainer}>
              <Text style={styles.descriptions}>Çocuklarınızın, engelli yakınlarınızın ya da her zaman yardıma </Text>
              <Text style={styles.descriptions}>ihtiyacı olanlarin (alzhemier vb) sizin belirlediğiniz konuma ulaştığında, </Text>
              <Text style={styles.descriptions}>konuma gittiğinde ya da konumdan ayrıldığında, bildirim alın. </Text>
              <Text style={styles.descriptions}>Anlık olarak nerede olduklarını görün, geriye </Text>
              <Text style={styles.descriptions}>dönük konumlarını FindMyFamily ile takip edin.</Text>
            </View>
          </View>
          <Pressable style={styles.buttons} onPress={() => swiper.current.scrollBy(1)} >
            <Text style={{ color: COLORS.white }}>NEXT</Text>
          </Pressable>
        </View>
        <View style={styles.slide2}>

          <Image style={{ width: width, height: height * 0.33, resizeMode: "cover", position: "absolute", top: 0, right: 0 }} source={require('../assets/slidetwo.png')} />
          <View style={{ alignItems: "center", marginTop: 70 }}>
            <Text style={styles.title}>Sevdiklerinizin güvende </Text>
            <Text style={styles.title}>olduklarından emin olun</Text>
            <View style={styles.textContainer}>
              <Text style={styles.descriptions}>Aramalarınıza cevap vermediklerinde, canlı olarak nerede olduklarını görün, </Text>
              <Text style={styles.descriptions}>bulunduğu ortamda tehlikede olduğunu düşünüyorsanız,</Text>
              <Text style={styles.descriptions}>FindMyFamily ile etrafındaki sesleri dinleyin </Text>
              <Text style={styles.descriptions}>  ve güvende olduklarından emin olun.</Text>
            </View>
          </View>
          <Pressable style={styles.buttons} onPress={() => swiper.current.scrollBy(1)} >
            <Text style={{ color: COLORS.white }}>NEXT</Text>
          </Pressable>
        </View>
        <View style={styles.slide3}>

          <Image style={{ width: width, height: height * 0.28, resizeMode: "cover", position: "absolute", top: 0, right: 0 }} source={require('../assets/slidetree.png')} />




          <Text style={styles.title}> Anında haberdar olun</Text>
          <View style={styles.textContainer}>
            <Text style={styles.descriptions}>Konum paylaşımını kapattığında anlık olarak bildirim alın,</Text>
            <Text style={styles.descriptions}> cihazın şarj süresini sürekli takip edin. </Text>
            <Text style={styles.descriptions}>Telefonu sessizde ise veya aramalarınızı duymuyor ise, </Text>
            <Text style={styles.descriptions}> titreşimli uyarı gönderin. Böylece telefon </Text>
            <Text style={styles.descriptions}> kaybolduğunda, bulunmasına da yardımcı olun.</Text>

          </View>
          <Pressable style={styles.buttons} onPress={() => swiper.current.scrollBy(1)} >
            <Text style={{ color: COLORS.white }}>NEXT</Text>
          </Pressable>
        </View>
        <View style={styles.slide3}>

          <Image style={{ width: width, height: height * 0.33, resizeMode: "cover", position: "absolute", top: 0, right: 0 }} source={require('../assets/slidefour.png')} />






          <Text style={styles.title}>Aileniz ile sohbetin tadını çıkarın</Text>
          <View style={styles.textContainer}>
            <Text style={styles.descriptions}>FindMyFamily sohbet özelliği ile </Text>
            <Text style={styles.descriptions}>sevdiklerinizle istediğiniz zaman sohbet edin. </Text>


          </View>
          <Pressable style={styles.buttons} onPress={() => swiper.current.scrollBy(1)} >
            <Text style={{ color: COLORS.white }}>NEXT</Text>
          </Pressable>
        </View>
        <View style={styles.slide3}>

          <Image style={{ width: width, height: height * 0.33, resizeMode: "cover", position: "absolute", top: 0, right: 0 }} source={require('../assets/slidefive.png')} />






          <Text style={styles.title}>Akıllı saatler (GPS Watch, Apple Watch)</Text>
          <Text style={styles.title}> ile uyumlu</Text>
          <View style={styles.textContainer}>
            <Text style={styles.descriptions}>Akıllı telefon kullanamayan küçük çocuklar,</Text>
            <Text style={styles.descriptions}>  yardıma ihtiyacı olan yetişkinler de FindMyFamily ile güvende kalsın.</Text>

          </View>
          <Pressable style={styles.buttons} onPress={() => swiper.current.scrollBy(1)} >
            <Text style={{ color: COLORS.white }}>NEXT</Text>
          </Pressable>
        </View>
        <View style={styles.slide3}>

          <Image style={{ width: width, height: height * 0.33, resizeMode: "cover", position: "absolute", top: 0, right: 0 }} source={require('../assets/slideseven.png')} />








          <Text style={styles.title}>Acil durum SOS sinyali</Text>
          <View style={styles.textContainer}>
            <Text style={styles.descriptions}>Sevdiklerinizin her zaman güvende olduklarını hissetmeleri için,</Text>
            <Text style={styles.descriptions}>FindMyFamily SOS ile konum bilgisi alin.</Text>
            <Text style={styles.descriptions}>  Size en çok ihtiyacı olduğu anda hızlıca yanında olun.</Text>

          </View>
          <Pressable style={styles.buttons} onPress={() => swiper.current.scrollBy(1)} >
            <Text style={{ color: COLORS.white }}>NEXT</Text>
          </Pressable>
        </View>
        <View style={styles.slide3}>

          <Image style={{ width: width, height: height * 0.33, resizeMode: "cover", position: "absolute", top: 0, right: 0 }} source={require('../assets/slide.png')} />
          <Text style={styles.title}>3 gün ücretsiz deneyin</Text>
          <View style={styles.textContainer}>
            <Text style={styles.descriptions}>3 gün boyunca tüm özellikleri deneyin, </Text>
            <Text style={styles.descriptions}>FindMyFamily ile sevdiklerinize her zaman daha yakın olun.</Text>

          </View>
          <Pressable style={styles.buttons} onPress={() => props.navigation.navigate('Choose')} >
            <Text style={{ color: COLORS.white }}>NEXT</Text>
          </Pressable>
        </View>
      </Swiper>


    </View>
  )
}

const styles = StyleSheet.create({

  slide1: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 45 : 10,
    alignItems: 'center',
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
  pagination: {

    color: "red"
  },
  title: {
    color: COLORS.demoPrimary,
    fontSize: 18,
    fontWeight: "bold",
    //  fontFamily:"Montserrat-Regular"
  },
  descriptions: {
    fontSize: 16,
    textAlign: "center",
    color: COLORS.black,
    opacity: 0.5,
    marginTop: 5,
    fontWeight: "bold"

  },
  textContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20
  },
  buttons: {
    width: 269,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.demoPrimary,
    borderRadius: 22,

  }
})
export { SwiperPage }