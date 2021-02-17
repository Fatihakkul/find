import React,{useState} from 'react' 
import { SafeAreaView,View,Text,FlatList ,Image, Pressable,Dimensions} from 'react-native'
import {EventListItem,BorderBlueButton} from '../../components'
import styles from '../../style/parentStyle/ChildEventsStyle'
import Icons from 'react-native-vector-icons/FontAwesome5'
import Colors from '../../style/Colors'

const ChildEvents =(props)=>{
    const data =[{ statu : "home",event: "eve geldi"},{ statu : "home",event: "eve geldi"},{ statu : "home",event: "eve geldi"},{ statu : "home",event: "eve geldi"},{ statu : "home",event: "eve geldi"},{ statu : "home",event: "eve geldi"},{ statu : "home",event: "eve geldi"},{ statu : "map-marker",event: "home"},{ statu : "map-marker",event: "eve geldi"},{ statu : "map-marker",event: "eve geldi"},{ statu : "map-marker",event: "eve geldi"},]
    const [arr,setArr]=useState(data)

    const renderList=({item,index})=>{
        return(
            <EventListItem  onPress={()=>console.log(index)} event={item} index={index} bool={index === arr.length - 1 ? false : true}/>
        )
    }
    return(
        <SafeAreaView style={{flex : 1,alignItems : "center"}}>
            <View style={styles.signalConatiner}>
                <Image style={styles.image} source={require('../../assets/child.jpg')}/>
                <View style={styles.infoContainer}>
                    <Icons name="bell" size={30} color={Colors.primary} />
                    <Text style={styles.infoTitle}>Yüksek Sesli Sinyal</Text>
                </View>
                <View style={{alignItems : "center",marginBottom : 10}}>
                <Text style={styles.infoText}>Çocuğunuz aramalarınızı duymuyorsa</Text>
                <Text style={styles.infoText}>çocuğunuzun telefonuna</Text>
                <Text style={styles.infoText}>yüksek sesli sinyal gönderin</Text>
                </View>
            
                <BorderBlueButton backgroundColor={Colors.primary} color="white" title="Çocuğa sinyal gönder"/>
            </View>
            
            <View style={styles.container}>

                <FlatList 
                    contentContainerStyle={{paddingBottom : 20}}
                    keyExtractor={(_,index)=>index.toString()}
                    data={arr}
                    renderItem={renderList}
                />
                
            </View>
            <Pressable style={styles.deleteButton} onPress={()=>console.log("delete")}>
                    <Icons name="trash-alt" color={Colors.primary} size={20} />
            </Pressable>
        </SafeAreaView>
    )
}
export { ChildEvents}