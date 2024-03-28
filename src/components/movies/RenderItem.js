import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { shape } from '../../theme'

const RenderItem = ({ item }) => {
    const navigation = useNavigation()
    return (
        <Pressable onPress={() => { navigation.navigate({ name: "details", params: { movie_id: item?.id } }) }} style={{ width: 140, height: 220, overflow: "hidden", elevation: 6, borderRadius: shape.borderRadius, }}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w200/${item?.poster_path}` }} resizeMode="stretch" style={{ width: "100%", height: "100%" }} />
        </Pressable>
    )
}

export default RenderItem