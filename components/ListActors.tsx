import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Carousel from 'react-native-snap-carousel'

const ListActors = ({data}: any) => {

  const _renderItem = ({item}: any) => {
    return (
    <View>
      <View>
        <ImageBackground source={{uri: data.image_url}}/>
        
      </View>
      <View></View>
    </View>
    )
  }

  return (
    <View>
      <Carousel
        data={data}
        renderItem={_renderItem}
      />
    </View>
  )
}

export default ListActors

const styles = StyleSheet.create({})
