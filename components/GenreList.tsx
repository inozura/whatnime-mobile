import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

const GenreList = ({data}: any) => {

  const _renderItem = ({item, index}: any) => {
    return (
      <View style={[styles.containerItem, index === 0 && {marginLeft: 20}]}>
        <Text style={styles.textStyle}>{item.name}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={_renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.containerSlider}
        keyExtractor={(item) => item.name}
        bounces
        alwaysBounceHorizontal
        bouncesZoom
      />
    </View>
  )
}

export default GenreList

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  containerSlider: {
    width: "100%",
    flex: 1
  },
  containerItem: {
    paddingVertical: 5,
    paddingHorizontal: 7,
    marginRight: 10,
    backgroundColor: "#252836",
    borderRadius: 25
  },
  textStyle: {
    color: "white",
    fontFamily: "montserrat-regular",
    fontSize: 13
  }
})
