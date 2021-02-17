import React, { useState , useEffect , useContext } from  'react' 
import { Pressable, SafeAreaView , Text , View,FlatList, ActivityIndicator,Linking} from 'react-native'
import Context from '../../context/store'
import Axios from 'axios'
import {ChatListItem,ChatChildListItem} from '../../components'
import styles from '../../style/parentStyle/ChooseChildStyle'
import COLORS from '../../style/Colors'

const ChatHomeChild =(props)=>{

    const {state,dispatch} = useContext(Context)
    const [loading , setLoading] = useState(false)
    const [childArray , setChildArray] = useState([])
    const [parent,setParent]=useState(state.family[0].parent)
   

    useEffect(()=>{
        getFamily()
        dispatch({ type: "SET_LIST", list: []})

        console.log(state.user)
    },[])

    function goPage(item){
        dispatch({ type: "SET_LIST", list: []})
        props.navigation.navigate("chatchild" , { message : item})
    }

    const renderChat=({item})=>{
        console.log(item)
       if(state.user.data[0].uniqueId != item.uniqueId) {
            if(item.uniqueId === parent.uniqueId){
                return null
            }else {
                
                return(
                            <ChatChildListItem  item={item} picture={item.picture} name={item.name} onPress={()=>goPage(item)}/>
                        )
            }
    
    }
    }
    const getFamily =async()=>{
        setLoading(true)
        let response = await Axios.post("https://wherismykid.herokuapp.com/api/children/getfamily",{
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
                <Text style={styles.title}>MESAJLAR</Text>
            </View>    
            <ChatChildListItem name="Parent" item={parent} picture={parent.picture} onPress={()=>goPage(parent)} />
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
                <Text style={[styles.title,{color : COLORS.white}]}>Aile üyesi ekleyerek </Text>
                <Text style={[styles.title,{color : COLORS.white}]}>onlarla mesajlaşabilirsin</Text>
            </View>
            }
               
            </View>
        </SafeAreaView>
    )
}
export {ChatHomeChild}