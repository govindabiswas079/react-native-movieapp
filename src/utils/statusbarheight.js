import { StatusBar, Platform, NativeModules } from 'react-native';

const { StatusBarManager } = NativeModules;

var statusbarheight = 0;
export const getStatusBarHeight = async () => {
    if (Platform.OS === 'ios') {
        const statusBarHeight = await StatusBarManager.getHeight();
        return statusBarHeight;
    } else {
        return StatusBar.currentHeight;
    }
};


getStatusBarHeight().then(statusBarHeight => {
    statusbarheight = statusBarHeight
});

// (async () => {
//     getStatusBarHeight().then(statusBarHeight => {
//         statusbarheight = statusBarHeight
//     });
//     return statusbarheight
// })()
export { statusbarheight }
