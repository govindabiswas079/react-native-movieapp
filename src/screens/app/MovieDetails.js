import { View, Text, StatusBar, Image, Pressable, ScrollView, TouchableOpacity } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import { useNavigation, useRoute } from "@react-navigation/native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import AntDesign from "react-native-vector-icons/AntDesign"
import { colors, FontStyle, shape } from '../../theme'
import { DetailsMovie } from '../../services'
import { Popular, TopRated, Upcoming } from '../../components/movies'
import { AsyncStorageManager } from '../../utils/AsyncStorageManager'

const MovieDetails = () => {
  const navigation = useNavigation()
  const { params } = useRoute();
  const [movie, setMovie] = useState(null)
  const [favorite, setFavorite] = useState([])
  const [watchlist, setWatchlist] = useState([])
  const [onRefresh, setOnRefresh] = useState(false)

  useEffect(() => {
    if (params?.movie_id) {
      DetailsMovie(params?.movie_id)
        .then((response) => {
          if (response?.status === 200) {
            setMovie(response?.data)
          }
        })
        .catch((error) => {
          console.log("error ===>", error)
        })
    }
  }, [params?.movie_id])



  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async (e) => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(colors?.background?.transparent, true);
      StatusBar.setTranslucent(true)
    })

    // Unsubscribe to event listener when component unmount
    return () => unsubscribe();
  }, [navigation]);


  const onWatchlist = (data) => {
    AsyncStorageManager.setWatchlist(data, setOnRefresh)
  }
  const onFavorite = (data) => {
    AsyncStorageManager.setFavorite(data, setOnRefresh)
  };

  useEffect(() => {
    (async () => {
      await AsyncStorageManager.getFavorite()
        .then((response) => {
          setFavorite(response)
        })

      await AsyncStorageManager.getWatchlist()
        .then((response) => {
          setWatchlist(response)
        })
    })()
  }, [onRefresh])

  return (
    <Fragment>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
        <View style={{ height: 400, width: "100%" }}>
          <Image source={{ uri: `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}` }} resizeMode="stretch" style={{ width: "100%", height: "100%" }} />
        </View>
        <View style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 15, }}>
            <Text style={{ ...FontStyle(colors?.text?.white, 22, 600), lineHeight: 28, flex: 1 }}>
              {movie?.title}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <TouchableOpacity activeOpacity={0.50} onPress={() => { onFavorite(movie) }} style={{ width: 30, height: 30, alignItems: "center", justifyContent: "center" }}>
                {favorite?.find((item) => item?.id === movie?.id) ?
                  <MaterialIcons name={"favorite"} color={colors?.primary?.main} size={22} />
                  :
                  <MaterialIcons name={"favorite-border"} color={colors?.text?.white} size={22} />
                }
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.50} onPress={() => { onWatchlist(movie) }} style={{ width: 30, height: 30, alignItems: "center", justifyContent: "center" }}>
                {watchlist?.find((item) => item?.id === movie?.id) ?
                  <AntDesign name={"plussquare"} color={colors?.primary?.main} size={22} />
                  :
                  <AntDesign name={"plussquareo"} color={colors?.text?.white} size={22} />
                }
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 10, paddingVertical: 10 }}>
            {movie?.genres?.map((value, index) => {
              return (
                <Text key={index} style={{ ...FontStyle(colors?.text?.white, 16, 500), backgroundColor: colors?.primary?.blueGrey?.[400], paddingHorizontal: 15, paddingVertical: 1, borderRadius: shape?.borderRadius / 2 }}>{value?.name}</Text>
              )
            })}
          </View>

          <View style={{ paddingVertical: 10, gap: 5 }}>
            <Text style={{ ...FontStyle(colors?.primary?.blueGrey?.[300], 16, 600), }}>Overview</Text>
            <Text style={{ ...FontStyle(colors?.text?.white, 16, 500), }}>{movie?.overview}</Text>
          </View>
          <View style={{ paddingVertical: 10, gap: 5 }}>
            <Text style={{ ...FontStyle(colors?.primary?.blueGrey?.[300], 16, 600), }}>Release date</Text>
            <Text style={{ ...FontStyle(colors?.text?.white, 16, 500), }}>{movie?.release_date}</Text>
          </View>
        </View>

        <View style={{ gap: 10 }}>
          <TopRated />
          <Popular />
          <Upcoming />
        </View>
      </ScrollView>
    </Fragment>
  )
}

export default MovieDetails