import React from 'react'
import { View, Dimensions, ImageBackground } from 'react-native'

import tempImage from '../receipts/costco1.png';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;
const ShowImage = (props) => {

return (
    <View>

        <ImageBackground 
        source = {props.route.params.url}
        style ={{height: deviceHeight, width: deviceWidth}}
        />

    </View>



)



}

export default ShowImage;