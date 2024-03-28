import { View, Text } from 'react-native'
import React, { Fragment } from 'react'
import { colors, FontStyle } from '../../theme'

const HeaderBar = ({ title }) => {

    return (
        <Fragment>
            <View style={{ backgroundColor: colors?.background?.tabBar, paddingVertical: 20, flexDirection: "row", alignItems: "center", gap: 15, paddingHorizontal: 15 }}>
                <Text style={{ ...FontStyle(colors?.text?.white, 20, 600) }}>{title}</Text>
            </View>
        </Fragment>
    )
}

HeaderBar.defaultProps = {
    title: "Prime Movie"
}

export default HeaderBar