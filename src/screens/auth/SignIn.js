import { View, Text, ScrollView, Image, Dimensions, Pressable, KeyboardAvoidingView } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Ionicons from "react-native-vector-icons/Ionicons"
import { colors, FontStyle } from '../../theme'
import TextInput from '../../components/textinput'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, } from 'react-redux';
import { setSnackbar } from '../../store/reducers/SnackbarReducer'
import { ContainedButton } from '../../components/buttons'
import { AsyncStorageManager } from '../../utils/AsyncStorageManager'
import { setIsLogin } from '../../store/reducers/AuthReducer'
import { loginimage } from '../../assets/icon'

const { width, height } = Dimensions.get("screen")
const SignIn = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [isPassword, setIsPassword] = useState(true)
  const [inputValue, setInputValue] = useState({
    username: "",
    password: ""
  });

  const onTextInput = (event) => {
    setInputValue({ ...inputValue, [event?.name]: event?.value })
  };

  const onSignIn = async () => {
    setLoading(true)
    if (!users.find((item) => item?.username === inputValue?.username)) {
      dispatch(setSnackbar({ visible: true, variant: "error", message: "User not exist" }))
      setLoading(false)
      return true
    }
    if (users.find((item) => item?.username === inputValue?.username)?.password !== inputValue?.password) {
      dispatch(setSnackbar({ visible: true, variant: "error", message: "Incorrect password" }))
      setLoading(false)
      return true
    }
    AsyncStorageManager.setToken(users.find((item) => item?.username === inputValue?.username)?._id.toString())
    setLoading(false)
    dispatch(setIsLogin(true))
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const data = await AsyncStorageManager.getUsers();
      setUsers(data)
    })
    return () => unsubscribe();
  }, [])
  return (
    <Fragment>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" enabled>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"handled"} contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 20, alignItems: "center", }}>
          <View style={{ width: "100%", height: height / 3 }}>
            <Image
              source={loginimage}
              resizeMode="cover" style={{ width: "auto", height: "100%" }}
            />
            <View>
              <Text style={{ ...FontStyle(colors?.primary?.blueGrey[50], 18, "700-italic"), position: "absolute", bottom: 10, width: "100%", textAlign: "center", letterSpacing: 15 }}>Prime.Movie</Text>
            </View>
          </View>
          <View style={{ maxWidth: 500, width: "100%", }}>
            <View style={{ paddingVertical: 20 }}>
              <Text style={{ ...FontStyle(colors?.text?.white, 25, 700) }}>Welcome Back</Text>
              <Text style={{ ...FontStyle(colors?.primary?.blueGrey[50], 16, 600), opacity: 0.7 }}>Please sign in to you account</Text>
            </View>

            <View style={{ gap: 10, }}>
              <View style={{ gap: 25 }}>
                <TextInput
                  placeholder={"Username"}
                  value={inputValue?.username}
                  onChangeText={(text) => { onTextInput({ name: "username", value: text }) }}
                  keyboardType={"email-address"}
                  inputMode={"email"}
                  autoComplete={"username"}
                  startIcon={() =>
                    <Pressable style={{}}>
                      <FontAwesome name={"user"} color={colors?.primary?.blueGrey?.[400]} size={20} />
                    </Pressable>
                  }
                />
                <TextInput
                  startIcon={() =>
                    <Pressable style={{}}>
                      <FontAwesome name={"lock"} color={colors?.primary?.blueGrey?.[400]} size={20} />
                    </Pressable>
                  }
                  endIcon={() =>
                    <Pressable onPress={() => { setIsPassword(!isPassword) }} style={{}}>
                      <Ionicons name={isPassword ? "eye-off" : "eye"} color={colors?.primary?.blueGrey?.[500]} size={20} />
                    </Pressable>
                  }
                  placeholder={"Password"}
                  value={inputValue?.password}
                  onChangeText={(text) => { onTextInput({ name: "password", value: text }) }}
                  secureTextEntry={isPassword}
                  keyboardType={"visible-password"}
                />
              </View>
              <Text onPress={() => { }} style={{ ...FontStyle(colors?.primary?.blueGrey[200], 16, 600), textAlign: "right" }}>Forgot Password?</Text>
              <View style={{ paddingTop: 10 }}>
                <ContainedButton
                  onPress={() => { onSignIn() }}
                  title={"Sign In"}
                  isLoading={loading}
                  disabled={(
                    (!inputValue?.username) ||
                    (!inputValue?.password) ||
                    loading
                  )}
                />
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 10 }}>
                <Text onPress={() => { }} style={{ ...FontStyle(colors?.primary?.blueGrey[200], 16, 600), textAlign: "center" }}>Don't have an Account?{" "}</Text>
                <Text onPress={() => { navigation.navigate("signup") }} style={{ ...FontStyle(colors?.primary?.main, 16, 600), textAlign: "center" }}>Sign Up</Text>
              </View>

            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Fragment>
  )
}

export default SignIn