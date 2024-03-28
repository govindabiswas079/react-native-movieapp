import { View, Text, StatusBar, FlatList, Pressable, Image } from 'react-native'
import React, { Fragment, useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import { colors, FontStyle, shape } from '../../theme';
import HeaderBar from '../../components/headerbar';
import { AsyncStorageManager } from '../../utils/AsyncStorageManager';
import { ContainedButton } from '../../components/buttons';
import MovieCard from '../../components/moviecard';

const Favorite = () => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([])

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", async (e) => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(colors?.background?.tabBar, true);
      StatusBar.setTranslucent(false)
      const data = await AsyncStorageManager.getFavorite();
      setFavorites(data)
    })

    // Unsubscribe to event listener when component unmount
    return () => unsubscribe();
  }, [navigation]);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async (e) => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(colors?.background?.tabBar, true);
      StatusBar.setTranslucent(false)
      const data = await AsyncStorageManager.getFavorite();
      setFavorites(data)
    })

    // Unsubscribe to event listener when component unmount
    return () => unsubscribe();
  }, [navigation]);

  return (
    <Fragment>
      <HeaderBar title={"Favorite"} />
      {!favorites?.length ?
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors?.background?.black }}>
          <View style={{ maxWidth: 250, width: "100%" }}>
            <ContainedButton onPress={() => { navigation.navigate("home") }} title={"Explore"} />
          </View>
        </View>
        :
        <FlatList
          style={{ backgroundColor: colors?.background?.black }}
          contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 10 }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          data={favorites || []}
          renderItem={({ item }) => <MovieCard item={item} />}
        />
      }
    </Fragment>
  )
}

export default Favorite