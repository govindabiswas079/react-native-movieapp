import React from 'react'
import { View, Text, ScrollView as SView, StatusBar } from 'react-native'
import { colors } from '../../theme'
import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';

const ScrollView = (props) => {
    const insets = useSafeAreaInsets();

    return (
        <SView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"handled"} showsHorizontalScrollIndicator={false} style={{ backgroundColor: colors?.background?.tabBar, }} contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 15,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
            width: "100%"
        }}>
            {props?.children}
        </SView>
    )
}

export default ScrollView