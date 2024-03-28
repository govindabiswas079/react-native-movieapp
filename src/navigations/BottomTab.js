import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import Octicons from "react-native-vector-icons/Octicons" // home
import Feather from "react-native-vector-icons/Feather" // home
import FontAwesome from "react-native-vector-icons/FontAwesome" // user-o
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons" // palette-swatch-outline
import MaterialIcons from "react-native-vector-icons/MaterialIcons" // favorite-border
import { Home, Profile, Watchlist, Favorite, Search } from '../screens/app'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../theme'

const Tab = createBottomTabNavigator();
const BottomTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: colors?.text?.black,
                    height: 60,
                    borderWidth: 0,
                    borderColor: colors?.background?.transparent,
                },
                sceneContainerStyle: {
                    backgroundColor: "red"
                },
                tabBarHideOnKeyboard: true
            }}
        >
            <Tab.Screen
                name="home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{}}>
                                <Octicons name={"home"} size={22} color={focused ? colors?.primary?.main : colors?.text?.white} />
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen
                name="search"
                component={Search}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{}}>
                                <Feather name={"search"} size={22} color={focused ? colors?.primary?.main : colors?.text?.white} />
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen
                name="favorite"
                component={Favorite}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{}}>
                                <MaterialIcons name={"favorite-border"} size={22} color={focused ? colors?.primary?.main : colors?.text?.white} />
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen
                name="watchlist"
                component={Watchlist}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{}}>
                                <MaterialCommunityIcons name={"palette-swatch-outline"} size={22} color={focused ? colors?.primary?.main : colors?.text?.white} />
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen
                name="profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{}}>
                                <FontAwesome name={"user-o"} size={22} color={focused ? colors?.primary?.main : colors?.text?.white} />
                            </View>
                        )
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTab