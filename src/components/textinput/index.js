import { View, Text, TextInput as RNTextInput, Pressable } from 'react-native'
import React, { Fragment } from 'react'
import { FontStyle, colors, shape } from '../../theme'

const TextInput = ({ onPress, startIcon, endIcon, placeholder, placeholderTextColor, onChangeText, value, editable, inputMode, keyboardType, onPressIn, readOnly, secureTextEntry, maxLength, autoCapitalize, autoComplete, autoFocus }) => {

    return (
        <Fragment>
            <Pressable onPress={onPress} style={{ display: "flex", flexDirection: "row", alignItems: "center", /* paddingVertical: 15, */ height: 55, paddingHorizontal: 10, borderWidth: 1, borderStyle: "solid", borderRadius: shape?.borderRadius, borderColor: colors?.primary?.blueGrey?.[50], flex: 1, }}>
                {typeof startIcon === "function" && startIcon()}
                {typeof startIcon === "object" && startIcon}
                <RNTextInput
                    style={{
                        flex: 1,
                        color: colors?.common?.black,
                        padding: 0,
                        margin: 0,
                        paddingHorizontal: 15,
                        ...FontStyle(colors?.text?.white, 16, 500)
                    }}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    onChangeText={onChangeText}
                    value={value}
                    editable={editable}
                    inputMode={inputMode}
                    keyboardType={keyboardType}
                    onPressIn={onPressIn}
                    readOnly={readOnly}
                    secureTextEntry={secureTextEntry}
                    maxLength={maxLength}
                    autoCapitalize={autoCapitalize}
                    autoComplete={autoComplete}
                    autoFocus={autoFocus}
                />
                {typeof startIcon === "function" && endIcon()}
                {typeof startIcon === "object" && endIcon}
            </Pressable>
        </Fragment>
    )
}
TextInput.defaultProps = {
    onPress: () => { },
    startIcon: () => { },
    endIcon: () => { },
    placeholder: undefined,
    placeholderTextColor: colors?.primary?.blueGrey?.[200],
    onChangeText: () => { },
    value: undefined,
    editable: true,
    inputMode: "text",
    keyboardType: "default",
    onPressIn: () => { },
    readOnly: false,
    secureTextEntry: false,
    maxLength: 100,
    autoCapitalize: "none",
    autoComplete: "off",
    autoFocus: false
};


export default TextInput