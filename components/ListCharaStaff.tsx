import React from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const ListCharaStaff = ({data}: any) => {

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={[styles.containerItem, index === 0 && {marginLeft: 20}]}>
        <View style={styles.wrapItem}>
          <Image source={{uri: item.image_url}} style={styles.imageStyle} />
          <Text numberOfLines={1} style={styles.textName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View>
      <FlatList 
        data={data}
        renderItem={_renderItem}
        horizontal
        showsHorizontalScrollIndicator
        keyExtractor={data => data.mal_id.toString()}
      />
    </View>
  )
}

export default ListCharaStaff

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  containerList: {
    width: "100%",
    flex: 1
  },
  wrapItem: {
    backgroundColor: "#252836",
    borderRadius: 5,
    justifyContent: "center",
    width: 65,
    textAlign: "center"
  },
  textName: {
    color: "white", 
    fontSize: 11, 
    fontFamily: "montserrat-regular",
    textAlign: "center",
    paddingVertical: 5
  },
  containerItem: {
    marginRight: 10
  },
  imageStyle: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 65,
    width: 65,
    resizeMode: "cover"
  }
})
