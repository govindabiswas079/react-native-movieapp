import { colors } from "./colors";

const fontWeight = {
    300: "OpenSans-Light",
    ["300-italic"]: "OpenSans-LightItalic",
    400: "OpenSans-Regular",
    ["400-italic"]: "OpenSans-RegularItalic",
    500: "OpenSans-Medium",
    ["500-italic"]: "OpenSans-MediumItalic",
    600: "OpenSans-SemiBold",
    ["600-italic"]: "OpenSans-SemiBoldItalic",
    700: "OpenSans-Bold",
    ["700-italic"]: "OpenSans-BoldItalic",
    800: "OpenSans-ExtraBold",
    ["800-italic"]: "OpenSans-ExtraBoldItalic",
}

export const FontStyle = (color = colors?.text?.black, fontSize = 14, fontFamily = 400) => {
    return {
        color: color,
        fontSize: fontSize,
        fontFamily: fontWeight[fontFamily]
    }
}