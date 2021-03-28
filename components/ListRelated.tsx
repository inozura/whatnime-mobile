import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import { getDetailAnime } from '../model/jikanAPI'

const ListRelated = ({data}: any) => {
  const _renderItem = ({item}) => {
    let data = {};
    const fetchData = async () => {
      try {
        const res = await getDetailAnime(item[0].mal_id);
        data = res;
      } catch (err) {
        console.warn(err)
      }
    }
    fetchData()

    return (
      <TouchableOpacity>
        <View style={styles.wrapItem}>
          <Image
            source={{uri: item[0].image_url}}
            style={styles.mainImage}
          />
          <Text numberOfLines={2} style={styles.titleName}>{item[0].name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={_renderItem}
        horizontal
        bounces
        showsHorizontalScrollIndicator={false}
        keyExtractor={data => data[0].mal_id.toString()}
      />
    </View>
  )
}

export default ListRelated

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1
  },
  mainImage: {
    width: 130,
    height: 170,
    resizeMode: "cover",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  titleName: {
    color: "white", 
    fontSize: 13, 
    fontFamily: "montserrat-medium", 
    marginBottom: 5
  },
  wrapItem: {
    backgroundColor: "#252836",
    borderRadius: 5,
    justifyContent: "center",
    textAlign: "center"
  }
})
