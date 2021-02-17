import React from 'react'
import {
    HomeParent,
    Login,
    ConnectionCode,
    Chat,
    Voice,
    ChildEvents,
    Settings
}from '../pages'
import { createStackNavigator} from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import BottomTab from './ParentBottomTab'
import Icons from 'react-native-vector-icons/FontAwesome5'
import COLORS from '../style/Colors'
 
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function Parent(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="LoginParent" component={Login} options={{headerShown : false}}/>
            <Stack.Screen name="bottomTab" component={BottomTab}  options={{headerShown : false}}/>
        </Stack.Navigator>
    )
}
export default Parent