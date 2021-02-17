import React from 'react' 
import {View , TextInput ,Pressable} from 'react-native'
import Icons from 'react-native-vector-icons/Ionicons'
import styles from '../style/childStyle/ChatChildStyle'
import COLORS from '../style/Colors'
const InputToolBar =(props) =>{
    return(
        <View style={styles.chatContainer}>
                   
                    <View style={styles.inputContainer}>
                        <TextInput 
                            placeholder="Bir mesaj girin"
                            onChangeText={props.onChangeText}
                            value={props.value}
                        />
                    </View>
                    <Pressable onPress={props.onPress}> 
                    <Icons name="send" size={30} color={COLORS.primary} />

                    </Pressable>
                
        </View>
    )
}
export {InputToolBar}