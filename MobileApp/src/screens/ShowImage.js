import React from 'react'
import { View, Dimensions, ImageBackground } from 'react-native'

const ShowImage = ({ route }) => {
    const input = route.params.url
    return (
        <View>
            <ImageBackground 
            source={{uri:input}}
            style ={{height: '100%', width: '100%'}}
            />
        </View>
    )
}
export default ShowImage;