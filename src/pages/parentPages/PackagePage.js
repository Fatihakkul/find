import React,{useEffect,useState} from "react"
import {
    SafeAreaView,
    View,
    Text,
    Image,
    ScrollView,
    ImageBackground,
    Pressable
} from "react-native"
import styles from "../../style/parentStyle/PackageStyle"
import Icon from "react-native-vector-icons/Ionicons"
import COLORS from "../../style/Colors"
import  RNIap from 'react-native-iap';

const itemSkus = Platform.select({
    ios: [
       "onemonth","twomonth","oneyear"
    ],
    android: [
        'com.example.coins100'
    ]
  });

const PackagePage = (props) => {


    const [product,setProduct]=useState([])

    useEffect(() => {

     
      RNIap.initConnection().then(conn => {
          console.log(conn)

          RNIap.getSubscriptions(itemSkus).then(res => {
              setProduct(res)
              console.log(res)
           //   alert("success")
          }).catch(err => {
              console.log(err,"ic") 
          })
          RNIap.endConnection()
      }).catch(err => {
          console.log(err , "ca") 
          alert("ERROR")
      })

     
  }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
             <View style={styles.header}>
                    <Icon onPress={()=>props.navigation.goBack()} name="arrow-back-outline" size={25} color={COLORS.black} />
                    <Text style={styles.title}>MEVCUT PLAN</Text>
                </View>
            <ScrollView style={{flex:1}} contentContainerStyle={styles.container}>
               
                <View style={styles.content}>
                    <Text style={styles.contentTitle}>FREE PLAN</Text>
                    <Text style={styles.text}>Belirli süre ücretsiz</Text>
                    <Text style={styles.text}>kullanbileceğin sürüm</Text>
                    <View style={styles.line}></View>
                    <Text style={[styles.text, { fontWeight: "bold", fontSize: 17 }]}>0$</Text>
                </View>
                <View style={{ width: "100%", marginTop: 20 }}>
                    <Text style={[styles.title, { color: COLORS.black }]}>PAKET YÜKSELT</Text>
                </View>
                <View style={styles.packageContent} >
                <ImageBackground style={styles.packageContent} source={require('../../assets/plan1.png')}>
                        <View>
                            <Image style={{ width: 150, height: 200, resizeMode: "contain" }} source={require('../../assets/Family.png')} />
                        </View>
                        <View style={styles.packageInfo}>
                            <View>
                                <Text style={styles.price}>15,99$</Text>
                                <Text style={[styles.text,{color:COLORS.white,fontSize : 14,marginLeft:10}]}>asasdasdasdasd</Text>
                                <Text style={[styles.text,{color:COLORS.white,fontSize : 14,marginLeft:10}]}>asdasdasdd</Text>
                                <Text style={[styles.text,{color:COLORS.white,fontSize : 14,marginLeft:10}]}>asdasd</Text>
                            </View>

                            <Pressable>
                                <View style={styles.button}>
                                    <Text style={[styles.text, { color: COLORS.white, fontWeight: "bold" }]}>YÜKSELT</Text>
                                </View>
                            </Pressable>
                        </View>
                    </ImageBackground>

                </View>
                <View style={styles.packageContent} >
                    <ImageBackground style={styles.packageContent} source={require('../../assets/plan2.png')}>
                        <View>
                            <Image style={{ width: 150, height: 200, resizeMode: "contain" }} source={require('../../assets/Family.png')} />
                        </View>
                        <View style={styles.packageInfo}>
                            <View>
                                <Text style={styles.price}>15,99$</Text>
                                <Text style={[styles.text,{color:COLORS.white,fontSize : 14,marginLeft:10}]}>asasdasdasdasd</Text>
                                <Text style={[styles.text,{color:COLORS.white,fontSize : 14,marginLeft:10}]}>asdasdasdd</Text>
                                <Text style={[styles.text,{color:COLORS.white,fontSize : 14,marginLeft:10}]}>asdasd</Text>
                            </View>

                            <Pressable>
                                <View style={styles.button}>
                                    <Text style={[styles.text, { color: COLORS.white, fontWeight: "bold" }]}>YÜKSELT</Text>
                                </View>
                            </Pressable>
                        </View>
                    </ImageBackground>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export { PackagePage }