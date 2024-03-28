import React, { Fragment } from 'react'
import { Text, Pressable, ActivityIndicator, TouchableOpacity } from 'react-native'
import { colors, FontStyle, shape } from '../../theme'

const ContainedButton = (props) => {

    return (
        <Fragment>
            <TouchableOpacity activeOpacity={0.50} onPress={props?.onPress} disabled={props?.disabled} style={{
                // paddingVertical: props?.size === "small" ? 10 : props?.size === "medium" ? 13 : props?.size === "large" && 15,
                height: 55,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: shape?.borderRadius,
                // opacity: props?.disabled ? 0.7 : 1,
                backgroundColor: props?.disabled ? colors?.primary?.blueGrey[500] : props?.backgroundColor
            }}>
                {props?.isLoading ?
                    <ActivityIndicator size={"small"} color={props?.loaderColor} />
                    :
                    <Text numberOfLines={1} style={{
                        // color: props?.fontColor,
                        // fontSize: props?.fontSize,
                        // fontFamily: "Roboto-Medium",

                        ...FontStyle(props?.fontColor, props?.fontSize, 600),
                        textTransform: props?.textTransform,
                        textAlign: "center",
                    }}>
                        {props?.title}
                    </Text>
                }
            </TouchableOpacity>
        </Fragment >
    )
}

ContainedButton.defaultProps = {
    size: "medium", // "small", "large", "small",
    backgroundColor: colors?.primary?.main,
    fontColor: colors?.text?.white,
    fontSize: 16,
    disabled: false,
    textTransform: "capitalize",
    onPress: () => { },
    title: "button",
    isLoading: false,
    loaderColor: colors?.text?.white,
}
export default ContainedButton