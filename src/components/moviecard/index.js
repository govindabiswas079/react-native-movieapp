import { Image, Pressable, Text, } from 'react-native'
import React, { Fragment } from 'react'
import { useNavigation } from "@react-navigation/native";
import { colors, FontStyle, shape, } from '../../theme';

const MovieCard = ({ item }) => {
    const navigation = useNavigation();

    return (
        <Fragment>
            <Pressable onPress={() => { navigation.navigate({ name: "details", params: { movie_id: item?.id } }) }} style={{ backgroundColor: colors?.background?.tabBar, width: "100%", height: 200, borderRadius: shape?.borderRadius, overflow: "hidden" }}>
                <Text numberOfLines={2} style={{ ...FontStyle(colors?.text?.white, 20, 700), position: "absolute", zIndex: 99, bottom: 10, left: 10 }}>{item?.title || "prime movie"}</Text>
                <Image
                    source={{ uri: item?.backdrop_path ? `https://image.tmdb.org/t/p/original/${item?.backdrop_path}` : "https://jitinchawla.com/wp-content/themes/eikra/assets/img/noimage-420x273.jpg" }}
                    defaultSource={{ uri: "https://jitinchawla.com/wp-content/themes/eikra/assets/img/noimage-420x273.jpg" }}
                    resizeMode="stretch" style={{ width: "100%", height: "100%" }} />
            </Pressable>
        </Fragment>
    )
}

export default MovieCard