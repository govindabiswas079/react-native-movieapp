import { View, Text } from 'react-native'
import React from 'react'
import { SignIn, SignUp, Welcome } from '../screens/auth'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../theme';
import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const AuthRoute = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                animationEnabled: true,
                animationTypeForReplace: "push",
                presentation: "modal",
                headerShown: false,
                animation: "slide_from_right",
                gestureDirection: "horizontal",
                fullScreenGestureEnabled: true,
                orientation: "portrait",
                statusBarHidden: false,
                statusBarAnimation: "slide",
                statusBarStyle: "light",
                statusBarColor: colors?.background?.transparent,
                statusBarTranslucent: true,
                contentStyle: {
                    backgroundColor: colors?.background?.black,
                }
            }}
        >
            <Stack.Screen
                name="welcom"
                component={Welcome}
                screenOptions={{
                    statusBarStyle: "light",
                }}
            />
            <Stack.Screen
                name="signin"
                component={SignIn}
            />
            <Stack.Screen
                name="signup"
                component={SignUp}
            />
        </Stack.Navigator>
    )
}

export default AuthRoute