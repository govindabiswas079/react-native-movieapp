/**
 * @format
 */

import { ActivityIndicator, AppRegistry, Linking, StatusBar, View } from 'react-native';
import App from './src';
import { name as appName } from './app.json';
import { Fragment, useEffect, useRef, useState } from 'react';
import { SafeAreaProvider, } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { colors } from './src/theme';
import { statusbarheight } from './src/utils/statusbarheight';
import { store } from './src/store';

const Main = () => {
    return (
        <Fragment>
            <SafeAreaProvider>
                <Provider store={store}>
                    <NavigationContainer
                        onReady={() => {  }}
                        fallback={
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: statusbarheight, backgroundColor: colors?.background?.white, }}>
                                <StatusBar translucent={false} barStyle={'dark-content'} backgroundColor={colors?.background?.white} />
                                <ActivityIndicator size={'large'} color={'#F25555'} />
                            </View>
                        }
                    >
                        <App />
                    </NavigationContainer>
                </Provider>
            </SafeAreaProvider>
        </Fragment>
    )
}

AppRegistry.registerComponent(appName, () => Main);
