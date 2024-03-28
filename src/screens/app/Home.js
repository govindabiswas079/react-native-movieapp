import { Animated, View, Text, Dimensions, ScrollView as SView, Pressable, StatusBar, Image } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import { colors, FontStyle, shape } from '../../theme';
import { NowPlaying } from '../../services';
import { Popular, TopRated, Upcoming } from '../../components/movies';

const Home = () => {
  const navigation = useNavigation()
  const [movies, setMovies] = useState([])

  useEffect(() => {
    (async () => {
      NowPlaying()
        .then((response) => {
          if (response?.status === 200) {
            setMovies(response?.data?.results)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    })()
  }, [])

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", async (e) => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(colors?.background?.transparent, true);
      StatusBar.setTranslucent(true)
    })

    // Unsubscribe to event listener when component unmount
    return () => unsubscribe();
  }, [navigation]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async (e) => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(colors?.background?.transparent, true);
      StatusBar.setTranslucent(true)
    })

    // Unsubscribe to event listener when component unmount
    return () => unsubscribe();
  }, [navigation]);

  return (
    <Fragment>
      <SView showsVerticalScrollIndicator={false} style={{ backgroundColor: colors?.background?.tabBar }}>
        {!movies?.length ?
          <View style={{ height: 280, backgroundColor: colors?.background?.background, elevation: 8 }} />
          :
          <SView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate={"fast"}
          >
            {movies?.map((value, inedx) => {
              return (
                <Pressable key={inedx} style={{ height: 280, width: Dimensions.get("screen").width, backgroundColor: colors?.background?.background, elevation: 8 }}>
                  <Image fadeDuration={100} source={{ uri: `https://image.tmdb.org/t/p/original/${value?.backdrop_path}` }} resizeMode="stretch" style={{ width: "100%", height: "100%", backgroundColor: colors?.background?.background, }} />
                  <Text style={{ ...FontStyle(colors?.text?.white, 20, 700), position: "absolute", bottom: 10, left: 15 }}>{value?.title}</Text>
                </Pressable>
              )
            })}
          </SView>
        }

        <View style={{ gap: 10, paddingVertical: 15 }}>
          <TopRated />
          <Popular />
          <Upcoming />
        </View>
      </SView>
    </Fragment>
  )
}

export default Home

