import AsyncStorage from '@react-native-community/async-storage';
import { store } from '../store';
import { setSnackbar } from '../store/reducers/SnackbarReducer';

export class AsyncStorageManager {
    static async setToken(token) {
        try {
            await AsyncStorage.setItem('TOKEN', token);
        } catch (error) {
            console.log(error);
        }
    }
    static async getToken() {
        const users = await AsyncStorage.getItem('TOKEN')
        return users
    }

    static async setUsers(users) {
        try {
            const data = await AsyncStorage.getItem('USERS');
            if (data) {
                const parse = JSON.parse(data)

                await AsyncStorage.setItem('USERS', JSON.stringify([...parse, users]));
            } else {
                await AsyncStorage.setItem('USERS', JSON.stringify([users]));
            }
        } catch (error) {
            console.log(error);
        }
    }
    static async getUsers() {
        const users = await AsyncStorage.getItem('USERS')
        if (users) return JSON.parse(users)
        return []
    }

    static async setFavorite(favorite, setOnRefresh) {
        try {
            const data = await AsyncStorage.getItem('FAVORITE');
            if (data) {
                const parse = JSON.parse(data)

                if (parse.find((item) => item?.id === favorite?.id)) {
                    const remove = parse?.filter((item, index) => {
                        return item?.id !== favorite?.id
                    })
                    await AsyncStorage.setItem('FAVORITE', JSON.stringify(remove));
                    setOnRefresh((prev) => !prev)
                    store.dispatch(setSnackbar({ visible: true, variant: "success", message: "Remove favorite" }))
                } else {
                    await AsyncStorage.setItem('FAVORITE', JSON.stringify([...parse, favorite]));
                    setOnRefresh((prev) => !prev)
                    store.dispatch(setSnackbar({ visible: true, variant: "success", message: "Added to favorites" }))
                }
            } else {
                await AsyncStorage.setItem('FAVORITE', JSON.stringify([favorite]));
                setOnRefresh((prev) => !prev)
                store.dispatch(setSnackbar({ visible: true, variant: "success", message: "Added to favorites" }))
            }
        } catch (error) {
            console.log(error);
        }
    }
    static async getFavorite() {
        const users = await AsyncStorage.getItem('FAVORITE')
        if (users) return JSON.parse(users)
        return []
    }

    static async setWatchlist(watchlist, setOnRefresh) {
        try {
            const data = await AsyncStorage.getItem('WATCHLIST');
            if (data) {
                const parse = JSON.parse(data)

                if (parse.find((item) => item?.id === watchlist?.id)) {
                    const remove = parse?.filter((item, index) => {
                        return item?.id !== watchlist?.id
                    })
                    await AsyncStorage.setItem('WATCHLIST', JSON.stringify(remove));
                    setOnRefresh((prev) => !prev)
                    store.dispatch(setSnackbar({ visible: true, variant: "success", message: "Remove watchlist" }))
                } else {
                    await AsyncStorage.setItem('WATCHLIST', JSON.stringify([...parse, watchlist]));
                    setOnRefresh((prev) => !prev)
                    store.dispatch(setSnackbar({ visible: true, variant: "success", message: "Added to watchlist" }))
                }
            } else {
                await AsyncStorage.setItem('WATCHLIST', JSON.stringify([watchlist]));
                setOnRefresh((prev) => !prev)
                store.dispatch(setSnackbar({ visible: true, variant: "success", message: "Added to watchlist" }))
            }
        } catch (error) {
            console.log(error);
        }
    }
    static async getWatchlist() {
        const users = await AsyncStorage.getItem('WATCHLIST')
        if (users) return JSON.parse(users)
        return []
    }

    static removeItems() {
        AsyncStorage.removeItem('TOKEN');
    }
}