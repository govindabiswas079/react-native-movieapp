import { View, Text } from 'react-native'
import React from 'react'
import { MovieDetails, Search } from '../screens/app'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import { colors } from '../theme';
import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();
const AppRoute = () => {
    const insets = useSafeAreaInsets();

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
                // statusBarHidden: false,
                // statusBarAnimation: "slide",
                // statusBarStyle: "light",
                // statusBarColor: colors?.background?.tabBar,
                // statusBarTranslucent: false,
                contentStyle: {
                    backgroundColor: colors?.background?.tabBar,
                    // paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                }
            }}
        >
            <Stack.Screen name="root" component={BottomTab} />
            <Stack.Screen
                name="details"
                component={MovieDetails}
                screenOptions={{
                    statusBarHidden: false,
                    statusBarAnimation: "slide",
                    statusBarStyle: "light",
                    statusBarColor: colors?.background?.transparent,
                    statusBarTranslucent: true,
                }}
            />
        </Stack.Navigator>
    )
}

export default AppRoute