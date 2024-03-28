import { View, Text, StatusBar, Pressable, Modal } from 'react-native'
import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/native"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useDispatch } from "react-redux"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ScrollView from '../../components/scrollview'
import { colors, FontStyle, shape } from '../../theme'
import { AsyncStorageManager } from '../../utils/AsyncStorageManager'
import { setIsLogin } from '../../store/reducers/AuthReducer'

const Profile = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [user, setUser] = useState(null);
  const [isLogout, setIsLogout] = useState(false)

  useEffect(() => {
    (async () => {
      const _id = await AsyncStorageManager.getToken();
      const data = await AsyncStorageManager.getUsers();
      setUser(data.find((item) => item?._id === Number(_id)))
    })()
  }, []);


  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", async (e) => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(colors?.primary?.blueGrey?.[300], true);
      StatusBar.setTranslucent(false)
    })

    // Unsubscribe to event listener when component unmount
    return () => unsubscribe();
  }, [navigation]);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async (e) => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(colors?.primary?.blueGrey?.[300], true);
      StatusBar.setTranslucent(false)
    })

    // Unsubscribe to event listener when component unmount
    return () => unsubscribe();
  }, [navigation]);




  StatusBar.setTranslucent(false)
  return (
    <Fragment>
      <View style={{ backgroundColor: colors?.primary?.blueGrey?.[300], paddingVertical: 20 }}>
        <View style={{ alignItems: "center", paddingVertical: 10 }}>
          <View style={{ backgroundColor: colors?.primary?.blueGrey[500], width: 130, height: 130, borderRadius: (130 / 2), alignItems: "center", justifyContent: "center" }}>
            <Text style={{ ...FontStyle(colors?.text?.white, 25, 600) }}>{user?.name.charAt(0)}</Text>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ ...FontStyle(colors?.text?.white, 25, 600) }}>
            {user?.name}
          </Text>
          <Text style={{ ...FontStyle(colors?.background?.main, 16, 600) }}>
            {user?.username}
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={{ gap: 10, paddingVertical: 10, paddingHorizontal: 15, }}>
          <Pressable onPress={() => navigation.navigate("favorite")} style={{ flexDirection: "row", alignItems: "center", gap: 15, backgroundColor: colors?.primary?.blueGrey?.[400], paddingVertical: 10, paddingHorizontal: 10, borderRadius: shape?.borderRadius }}>
            <MaterialIcons name={"favorite-border"} size={22} color={colors?.text?.white} />
            <Text style={{ ...FontStyle(colors?.text?.white, 18, 600), flex: 1 }}>Favorite</Text>
            <View style={{ backgroundColor: colors?.background?.white, width: 30, height: 30, borderRadius: shape?.borderRadius / 2, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ ...FontStyle(colors?.text?.dark, 18, 600) }}>0</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("watchlist")} style={{ flexDirection: "row", alignItems: "center", gap: 15, backgroundColor: colors?.primary?.blueGrey?.[400], paddingVertical: 10, paddingHorizontal: 10, borderRadius: shape?.borderRadius }}>
            <MaterialCommunityIcons name={"palette-swatch-outline"} size={22} color={colors?.text?.white} />
            <Text style={{ ...FontStyle(colors?.text?.white, 18, 600), flex: 1 }}>Watchlist</Text>
            <View style={{ backgroundColor: colors?.background?.white, width: 30, height: 30, borderRadius: shape?.borderRadius / 2, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ ...FontStyle(colors?.text?.dark, 18, 600) }}>0</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
      <View style={{ backgroundColor: colors?.background?.tabBar, paddingVertical: 10, paddingHorizontal: 15 }}>
        <Pressable onPress={() => { setIsLogout(true) }} style={{ flexDirection: "row", alignItems: "center", gap: 15, backgroundColor: colors?.error?.light, paddingVertical: 15, paddingHorizontal: 15, borderRadius: shape?.borderRadius }}>
          <MaterialIcons name={"logout"} size={22} color={colors?.text?.white} />
          <Text style={{ ...FontStyle(colors?.text?.white, 18, 600), flex: 1 }}>Logout</Text>
        </Pressable>
      </View>



      <Modal
        visible={isLogout}
        onRequestClose={() => { setIsLogout(false) }}
        transparent
        statusBarTranslucent
        animationType="slide"
      >
        <Pressable style={{ flex: 1, backgroundColor: colors?.background?.backdrop, paddingHorizontal: 15, paddingVertical: 15 }}>
          <Pressable onPress={() => { setIsLogout(false) }} style={{ flex: 1 }}>

          </Pressable>
          <View style={{ paddingHorizontal: 15, paddingVertical: 15, elevation: 6, borderRadius: shape?.borderRadius, backgroundColor: colors?.primary?.blueGrey?.[300] }}>
            <Text style={{ ...FontStyle(colors?.text?.white, 20, 700) }}>Log Out</Text>
            <Text style={{ ...FontStyle(colors?.text?.white, 18, 600), paddingVertical: 20 }}>Are you sure, You want to logout?</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Pressable onPress={() => { setIsLogout(false) }} style={{ flex: 1 / 2, alignItems: "center", justifyContent: "center", height: 45, borderRadius: shape?.borderRadius }}>
                <Text style={{ ...FontStyle(colors?.error?.main, 18, 600) }}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  AsyncStorageManager.removeItems();
                  dispatch(setIsLogin({ isLogin: false }))
                }}
                style={{ flex: 1, alignItems: "center", justifyContent: "center", height: 45, backgroundColor: colors?.primary?.main, borderRadius: shape?.borderRadius }}>
                <Text style={{ ...FontStyle(colors?.text?.white, 18, 600) }}>Yes, I'm sure</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>
    </Fragment>
  )
}

export default Profile