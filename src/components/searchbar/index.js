import React, { Fragment } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import Feather from "react-native-vector-icons/Feather"
import AntDesign from "react-native-vector-icons/AntDesign"
import { colors, FontStyle } from '../../theme';
import { statusbarheight } from '../../utils/statusbarheight';

const SearchBar = ({ search, setSearch }) => {
    return (
        <Fragment>
            {/* <View style={{ height: statusbarheight }} /> */}
            <View style={{ paddingVertical: 10, backgroundColor: colors?.background?.tabBar, paddingHorizontal: 15 }}>
                <View style={{ display: "flex", flexDirection: "row", height: 50, alignItems: "center" }}>
                    <Feather name={"search"} size={22} color={colors?.primary?.blueGrey?.[200]} />
                    <TextInput
                        placeholder={"Search"}
                        placeholderTextColor={colors?.primary?.blueGrey?.[200]}
                        style={{
                            flex: 1,
                            color: colors?.common?.black,
                            padding: 0,
                            margin: 0,
                            paddingHorizontal: 15,
                            ...FontStyle(colors?.text?.white, 16, 500)
                        }}
                        autoFocus={true}
                        value={search}
                        onChangeText={(text) => { setSearch(text) }}
                    />
                    {search &&
                        <TouchableOpacity style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center" }}>
                            <AntDesign name={"closecircleo"} size={22} color={colors?.text?.white} />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </Fragment>
    )
}

export default SearchBar