import React, { useState , useEffect , useContext } from  'react' 
import { Pressable, SafeAreaView , Text , View,FlatList, ActivityIndicator,Linking} from 'react-native'
import Context from '../../context/store'
import Axios from 'axios'
import {ChatListItem,ChatChildListItem} from '../../components'
import styles from '../../style/parentStyle/ChooseChildStyle'
import COLORS from '../../style/Colors'
import * as Notifications from "expo-notifications"
import strings from '../../strings'
import API from '../../data/api'

const ChatHomeChild =(props)=>{

    const {state,dispatch} = useContext(Context)
    const [loading , setLoading] = useState(false)
    const [childArray , setChildArray] = useState([])
    const [parent,setParent]=useState(state.family[0].parent)
   


    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            Notifications.setNotificationHandler({
                handleNotification: async () => {
                  return {
                    shouldShowAlert: true,
                    shouldPlaySound : true
                  }
                }
              })
        });
    
        return unsubscribe;
      }, [props.navigation]);


    useEffect(()=>{
        getFamily()
        dispatch({ type: "SET_LIST", list: []})

        console.log(state.user)
    },[])

    function goPage(item , i){
        dispatch({ type: "SET_LIST", list: []})
        props.navigation.navigate("chatchild" , { message : item , child : i})
    }

    const renderChat=({item})=>{
        console.log(item)
       if(state.user.data[0].uniqueId != item.uniqueId) {
            if(item.uniqueId === parent.uniqueId){
                return null
            }else {
                
                return(
                            <ChatChildListItem  item={item} picture={item.picture} name={item.name} onPress={()=>goPage(item , false)}/>
                        )
            }
    
    }
    }
    const getFamily =async()=>{
        setLoading(true)
        let response = await Axios.post(API.base_url + "/children/getfamily",{
            parentId : state.family[0].parentId
         })
        setChildArray(response.data.data.response)
        dispatch({type : "SET_FAMILY" , family : response.data.data.response })
        console.log("merhaba" , response)
        setLoading(false)
    }
    return(
        <SafeAreaView>
            <View style={{alignItems : "center",paddingTop : 10}}>
            <View style={styles.headerTitle}>
                <Text style={styles.title}>{strings.chat}</Text>
            </View>    
            <ChatChildListItem name="Parent" item={parent} picture={parent.picture} onPress={()=>goPage(parent , true)} />
               {childArray.length != 0 ?  
               <FlatList 
                    keyExtractor={(_,index)=>index.toString()}
                    renderItem={renderChat}
                    data={childArray}
                />
            :
            loading ? 

            <ActivityIndicator color={COLORS.primary} size="large" />

            :
            <View style={[styles.emptyView,{marginTop : 20}]}>
                <Text style={[styles.title,{color : COLORS.white}]}>{strings.addFamily}</Text>
            </View>
            }
               
            </View>
        </SafeAreaView>
    )
}
export {ChatHomeChild}