import { View, Text, FlatList, Pressable, Image } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import { colors, FontStyle, shape } from '../../theme'
import { UpcomingMovie } from '../../services'
import RenderItem from './RenderItem'

const Upcoming = ({ }) => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        UpcomingMovie()
            .then((response) => {
                if (response?.status === 200) {
                    setMovies(response?.data?.results)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    if(!movies.length) return
    return (
        <Fragment>
            <Text style={{ ...FontStyle(colors?.text?.white, 18, 700), paddingHorizontal: 10 }}>Upcoming</Text>
            <FlatList
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10 }}
                horizontal={true}
                data={movies || []}
                renderItem={({item}) => <RenderItem item={item} />}
                ItemSeparatorComponent={() => <View style={{ width: 10, }} />}

            />
        </Fragment>
    )
}

export default Upcoming