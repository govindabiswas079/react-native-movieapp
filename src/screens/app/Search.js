import { FlatList, Image, Pressable, StatusBar, Text, View, } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import { colors, shape, } from '../../theme';
import SearchBar from '../../components/searchbar';
import MovieCard from '../../components/moviecard';
import { SearchMovie } from '../../services';

const Search = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([])

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", async (e) => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(colors?.background?.tabBar, true);
      StatusBar.setTranslucent(false)
    })

    // Unsubscribe to event listener when component unmount
    return () => unsubscribe();
  }, [navigation]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async (e) => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(colors?.background?.tabBar, true);
      StatusBar.setTranslucent(false)
    })

    // Unsubscribe to event listener when component unmount
    return () => unsubscribe();
  }, [navigation]);

  useEffect(() => {
    (async () => {
      SearchMovie()
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

  return (
    <Fragment>
      <SearchBar search={search} setSearch={setSearch} />
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colors?.background?.black }}
        contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 10 }}
        data={movies.filter((item) => item?.backdrop_path !== null)}
        renderItem={({ item }) => <MovieCard item={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </Fragment>
  )
}

export default Search