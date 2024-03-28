import { View, Text, ScrollView, Image, Dimensions, Pressable, KeyboardAvoidingView } from 'react-native'
import React, { Fragment, useState } from 'react'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { colors, FontStyle } from '../../theme'
import TextInput from '../../components/textinput'
import { setSnackbar } from '../../store/reducers/SnackbarReducer'
import { emailvalidate } from '../../utils/emailvalidate';
import { passwordvalidaate } from '../../utils/passwordvalidate';
import { ContainedButton } from '../../components/buttons';
import { AsyncStorageManager } from '../../utils/AsyncStorageManager';
import { registerimage } from '../../assets/icon';

const { width, height } = Dimensions.get("screen")
const SignUp = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const [isPassword, setIsPassword] = useState({
    password: true,
    confirmpassword: true
  })
  const [inputValue, setInputValue] = useState({
    name: "",
    mobile: "",
    username: "",
    password: "",
    confirmpassword: ""
  });

  const onTextInput = (event) => {
    setInputValue({ ...inputValue, [event?.name]: event?.value })
  };

  const onSignUp = async () => {
    setLoading(true)
    const data = await AsyncStorageManager.getUsers();
    if (data.find((item) => item?.mobile === inputValue?.mobile)) {
      setLoading(false)
      dispatch(setSnackbar({ visible: true, variant: "error", message: "Mobile already exists" }))
      return true
    }
    if (data.find((item) => item?.username === inputValue?.username)) {
      setLoading(false)
      dispatch(setSnackbar({ visible: true, variant: "error", message: "Username already exists" }))
      return true
    }

    AsyncStorageManager.setUsers({
      name: inputValue?.name,
      mobile: inputValue?.mobile,
      username: inputValue?.username,
      password: inputValue?.password,
      _id: Math.floor(Math.random() * 10000000)
    })
      .then((users) => {
        navigation.navigate("signin")
      })
      .catch((error) => {
        dispatch(setSnackbar({ visible: true, variant: "error", message: "Unable to process, Please try again" }))
      })
      .finally(() => {
        setLoading(false)
      })
  };

  return (
    <Fragment>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" enabled>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"handled"} contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 0, paddingBottom: 15, alignItems: "center", }}>
          <View style={{ width: "100%", height: height / 4 }}>
            <Image
              source={registerimage}
              resizeMode="cover" style={{ width: "auto", height: "100%" }}
            />
            <View>
              <Text style={{ ...FontStyle(colors?.primary?.blueGrey[50], 18, "700-italic"), position: "absolute", bottom: 10, width: "100%", textAlign: "center", letterSpacing: 15 }}>Prime.Movie</Text>
            </View>
          </View>
          <View style={{ maxWidth: 500, width: "100%", }}>
            <View style={{ paddingVertical: 20 }}>
              <Text style={{ ...FontStyle(colors?.text?.white, 25, 700) }}>Create new account</Text>
              <Text style={{ ...FontStyle(colors?.primary?.blueGrey[50], 16, 600), opacity: 0.7 }}>Please fill in the form to continue</Text>
            </View>

            <View style={{ gap: 10, }}>
              <View style={{ gap: 25 }}>
                <TextInput
                  startIcon={() =>
                    <Pressable style={{}}>
                      <FontAwesome name={"user"} color={colors?.primary?.blueGrey?.[400]} size={20} />
                    </Pressable>
                  }
                  placeholder={"Name"}
                  value={inputValue?.name}
                  onChangeText={(text) => { onTextInput({ name: "name", value: text }) }}
                  autoComplete={"name"}
                />

                <View style={{ gap: 5 }}>
                  <TextInput
                    startIcon={() =>
                      <Pressable style={{}}>
                        <FontAwesome name={"phone"} color={colors?.primary?.blueGrey?.[400]} size={20} />
                      </Pressable>
                    }
                    placeholder={"Phone"}
                    value={inputValue?.mobile}
                    onChangeText={(text) => { onTextInput({ name: "mobile", value: text }) }}
                    keyboardType={"phone-pad"}
                    inputMode={"numeric"}
                    maxLength={10}
                  />
                  {inputValue?.mobile && inputValue?.mobile?.length !== 10 &&
                    <Text style={{ ...FontStyle(colors?.error?.light, 14, 400) }}>Please enter 10 digit phone number</Text>
                  }
                </View>

                <View style={{ gap: 5 }}>
                  <TextInput
                    startIcon={() =>
                      <Pressable style={{}}>
                        <MaterialCommunityIcons name={"email"} color={colors?.primary?.blueGrey?.[400]} size={20} />
                      </Pressable>
                    }
                    placeholder={"email"}
                    value={inputValue?.email}
                    onChangeText={(text) => { onTextInput({ name: "username", value: text }) }}
                    keyboardType={"email-address"}
                    inputMode={"email"}
                    autoComplete={"email"}
                  />
                  {inputValue?.email && emailvalidate(inputValue?.email) &&
                    <Text style={{ ...FontStyle(colors?.error?.light, 14, 400) }}>Please enter valid email</Text>
                  }
                </View>

                <View style={{ gap: 5 }}>
                  <TextInput
                    startIcon={() =>
                      <Pressable style={{}}>
                        <FontAwesome name={"lock"} color={colors?.primary?.blueGrey?.[400]} size={20} />
                      </Pressable>
                    }
                    endIcon={() =>
                      <Pressable onPress={() => { setIsPassword({ ...isPassword, password: !isPassword?.password }) }} style={{}}>
                        <Ionicons name={isPassword ? "eye-off" : "eye"} color={colors?.primary?.blueGrey?.[500]} size={20} />
                      </Pressable>
                    }
                    placeholder={"Password"}
                    value={inputValue?.password}
                    onChangeText={(text) => { onTextInput({ name: "password", value: text }) }}
                    secureTextEntry={isPassword?.password}
                    keyboardType={"visible-password"}
                  />
                  {inputValue?.password && passwordvalidaate(inputValue?.password) &&
                    <Text style={{ ...FontStyle(colors?.error?.light, 14, 400) }}>* Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</Text>
                  }
                </View>

                <View style={{ gap: 5 }}>
                  <TextInput
                    startIcon={() =>
                      <Pressable style={{}}>
                        <FontAwesome name={"lock"} color={colors?.primary?.blueGrey?.[400]} size={20} />
                      </Pressable>
                    }
                    endIcon={() =>
                      <Pressable onPress={() => { setIsPassword({ ...isPassword, confirmpassword: !isPassword?.confirmpassword }) }} style={{}}>
                        <Ionicons name={isPassword ? "eye-off" : "eye"} color={colors?.primary?.blueGrey?.[500]} size={20} />
                      </Pressable>
                    }
                    placeholder={"Confirm Password"}
                    value={inputValue?.confirmpassword}
                    onChangeText={(text) => { onTextInput({ name: "confirmpassword", value: text }) }}
                    secureTextEntry={isPassword?.confirmpassword}
                    keyboardType={"visible-password"}
                    autoComplete={"new-password"}
                  />
                  {inputValue?.confirmpassword && inputValue?.password !== inputValue?.confirmpassword &&
                    <Text style={{ ...FontStyle(colors?.error?.light, 14, 400) }}>Password not match</Text>
                  }
                </View>
                <View style={{ paddingTop: 10 }}>
                  <ContainedButton
                    onPress={() => onSignUp()}
                    title={"Sign Up"}
                    isLoading={loading}
                    disabled={(
                      (!inputValue?.name) ||
                      (!inputValue?.mobile) ||
                      (!inputValue?.username) ||
                      (!inputValue?.password || passwordvalidaate(inputValue?.password)) ||
                      (!inputValue?.confirmpassword || inputValue?.password !== inputValue?.confirmpassword)
                    )}
                  />

                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                  <Text onPress={() => { }} style={{ ...FontStyle(colors?.primary?.blueGrey[200], 16, 600), textAlign: "center" }}>Have an Account?{" "}</Text>
                  <Text onPress={() => { navigation.goBack() }} style={{ ...FontStyle(colors?.primary?.main, 16, 600), textAlign: "center" }}>Sign In</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Fragment>
  )
}

export default SignUp