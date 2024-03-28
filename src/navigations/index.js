import React, { Fragment, useEffect } from 'react'
import { View, Text, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native'
import { Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackbar } from '../store/reducers/SnackbarReducer';
import { FontStyle, colors } from '../theme';
import AuthRoute from './AuthRoute'
import { AsyncStorageManager } from '../utils/AsyncStorageManager'
import { setIsLogin } from '../store/reducers/AuthReducer'
import AppRoute from './AppRoute';

const Navigation = () => {
  const dispatch = useDispatch()
  const { visible, variant, message } = useSelector((state) => state?.Snacknotify)
  const { isLogin } = useSelector((state) => state?.Auth);

  const onDismissSnackBar = () => {
    dispatch(setSnackbar({ visible: false, variant, message }));
  }

  useEffect(() => {
    const getdata = async () => {
      const isToken = await AsyncStorageManager.getToken()
      if (isToken) {
        dispatch(setIsLogin({ isLogin: true }))
      } else {
        dispatch(setIsLogin({ isLogin: false }))
      }
    }
    getdata()
  }, [isLogin]);

  if (isLogin === null) {
    return (
      <Fragment>
        <StatusBar barStyle={"light-content"} backgroundColor={colors?.background?.tabBar} />
        <View style={{ backgroundColor: colors?.background?.tabBar, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ gap: 25 }}>
            <ActivityIndicator size={'large'} color={colors?.primary?.main} />
            <Text style={{ ...FontStyle(colors?.text?.white, 18, 500) }}>
              Please wait while we setup something for you
            </Text>
          </View>
        </View>
      </Fragment>
    )
  }
  return (
    <Fragment>
      {isLogin ?
        <AppRoute />
        :
        <AuthRoute />
      }


      <Snackbar
        visible={visible}
        duration={3000}
        elevation={5}
        onDismiss={onDismissSnackBar}
        style={{ backgroundColor: variant === "success" ? colors?.success?.dark : colors?.error?.main, zIndex: 9999999, marginVertical: 30, }}
      >
        <View style={{ display: "flex", alignItems: "center", flexDirection: "row", gap: 20, }}>
          <Text style={{ ...FontStyle(colors?.text?.white, 14, 600,), flex: 1 }}>{message}</Text>
          <TouchableOpacity onPress={() => onDismissSnackBar()}>
            <Text style={{ ...FontStyle(colors?.text?.white, 14, 700), }}>Dismiss</Text>
          </TouchableOpacity>
        </View>
      </Snackbar>
    </Fragment>
  )
}

export default Navigation