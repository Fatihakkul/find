import React, { useEffect, useContext } from 'react'
import { Linking } from 'react-native'
import {
    Choose,
    SwiperPage,
    Chat,
    PackagePage,
    EditUser,
    SplashScreen,
    ChatChild,
    SosChild
} from '../pages'
import Provider from '../context/Provider'
import Child,{ChildBottom} from './Child'
import Parent from './Parent'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import BottomTab from './ParentBottomTab'

const Stack = createStackNavigator()
function Router() {

    // useEffect(()=>{
    //     BackgroundJob.start(taskRandom,options)

    // },[])

    return (
        <Provider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="splash">
                    <Stack.Screen name="splash" component={SplashScreen} options={{headerShown : false}}  />
                    <Stack.Screen name="Swiper" component={SwiperPage} options={{ headerShown: false }} />
                    <Stack.Screen name="Choose" component={Choose} options={{ headerShown: false }} />
                    <Stack.Screen name="Parent" component={Parent} options={{ headerShown: false }} />
                    <Stack.Screen name="Child" component={Child} options={{ headerShown: false }} />
                    <Stack.Screen name="bottomtab" component={BottomTab} options={{ headerShown: false }} />
                    <Stack.Screen name="ParentChat" component={Chat} options={{ headerShown: false }} />
                    <Stack.Screen name="package" component={PackagePage} options={{ headerShown: false }} />
                    <Stack.Screen name="editparent" component={EditUser} options={{ headerShown: false }} />
                    <Stack.Screen name="home" component={ChildBottom} options={{ headerShown: false }} />
                    <Stack.Screen name="chatchild" component={ChatChild} options={{ headerShown: false }} />
                    <Stack.Screen name="soschild" component={SosChild} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}
export default Router