import React from 'react' 
import { View , Pressable , Text } from 'react-native'



const ChildItem =props=>{
    return(
        <View>
            <Text>{props.item}</Text>
        </View>
    )
}
export {ChildItem}