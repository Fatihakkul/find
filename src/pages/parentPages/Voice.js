import React,{useState} from 'react'
import { SafeAreaView,View,Text ,FlatList, Pressable} from 'react-native'
import { VoiceRecord ,RecordListItem} from '../../components'
import styles from '../../style/parentStyle/VoiceStyle'


const Voice =(props)=>{
    const data=[{id : 1 , date : "asdasd" , title : "kayıt"},{id : 2 , date : "asdasd" , title : "kayıt"},{id : 3 , date : "asdasd" , title : "kayıt"},{id : 4 , date : "asdasd" , title : "kayıt"},{id : 5, date : "asdasd" , title : "kayıt"},{id : 6 , date : "asdasd" , title : "kayıt"},{id : 7 , date : "asdasd" , title : "kayıt"},]
    const [arr,setArr]=useState(data)

    function deleteItem (value){
        let newlist = [...arr]
        setArr(newlist.filter((item)=>{
            if(item.id != value.id){
                return item
            }else null
        }))
    }

    const renderList=({item,index})=>{
        return(
            <RecordListItem data={item} onPress={()=>console.log(item.id)} delete={()=>deleteItem(item)}/>
        )
    }
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.title}>Telefonun etrafında neler oluyor öğren! </Text>
                <View style={styles.buttonContainer}>
                       
                        <View style={styles.button}>
                            <VoiceRecord  name="volume-up" backgrounColor="#fc1424" />
                            <Text style={{marginTop : 5}}>Dinleyin</Text>
                        </View>
                        <View style={styles.button}>
                            <VoiceRecord  name="microphone" backgrounColor="#23effa" />
                            <Text style={{marginTop : 5}}>Kaydedin</Text>
                        </View>
                </View>
                <Text style={[styles.title,{opacity : 0.3,fontSize : 12}]}>Kayıtlar 1 ay saklanır</Text>
            </View>
            <View style={styles.record}>
                <FlatList 
                    keyExtractor={(_,index)=>index.toString()}
                    data={arr}
                    renderItem={renderList}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    )
}
export { Voice}