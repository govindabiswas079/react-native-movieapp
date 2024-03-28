import { View, Text, Pressable, Image } from 'react-native'
import React, { Fragment } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';
import { colors, FontStyle } from '../../theme'
import { welcom } from '../../assets/icon';
import { ContainedButton } from '../../components/buttons';

const Welcome = () => {
    const navigation = useNavigation()
    return (
        <Fragment>
            <View
                // resizeMode="stretch"
                // resizeMethod="auto"
                // source={{ uri: "https://rukminim2.flixcart.com/image/850/1000/poster/e/k/u/akhuratha-poster-movie-priest-hd-wallpaper-background-akmov3900-original-imaek7n4hfdnfdmw.jpeg?q=90&crop=false" }}
                // source={welcom}
                style={{ flex: 1, paddingVertical: 15, justifyContent: "flex-end", maxWidth: 500, width: "100%", alignSelf: "center", alignItems: "center" }}
            >
                <View style={{ width: "100%", height: 800, backgroundColor: colors?.background?.black, position: "absolute", bottom: 0 }}>
                    <Image source={welcom} resizeMode="cover" style={{ height: "100%", width: "100%" }} />
                </View>
                <View style={{ gap: 15 }}>
                    <View style={{ gap: 15 }}>
                        <Text style={{ ...FontStyle(colors?.primary?.blueGrey[50], 30, "700-italic"), letterSpacing: 10 }}>Prime.Movie</Text>
                        <Text style={{ ...FontStyle(colors?.text?.white, 18, "600-italic") }}>Watch your favorite movies or series on only one platform. You can watch it anytime and anywhere.</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 0 }}>
                        <Text style={{ ...FontStyle(colors?.text?.white, 14, 600) }}>Action</Text>
                        <Entypo name={"dot-single"} size={30} color={colors?.primary?.blueGrey[600]} />
                        <Text style={{ ...FontStyle(colors?.text?.white, 14, 600) }}>Drama</Text>
                        <Entypo name={"dot-single"} size={30} color={colors?.primary?.blueGrey[600]} />
                        <Text style={{ ...FontStyle(colors?.text?.white, 14, 600) }}>Comedy</Text>
                    </View>
                    <ContainedButton onPress={() => { navigation.navigate("signin") }} title={"Get Started"} />
                </View>
            </View>
        </Fragment>
    )
}

export default Welcome