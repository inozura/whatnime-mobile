import React from 'react'
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

const ListSearch = ({data, isLoading, navigation}: any) => {
  const _renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={styles.containerItem}
        onPress={() => navigation.navigate('DetailAnime', {id: item.mal_id})}
      >
        <Image
          source={{uri: item.image_url}}
          style={styles.imageItem}
        />
        <View style={styles.wrapContent}>
          <View style={{flexDirection: "row", marginBottom: 7}}>
            <Text numberOfLines={1} style={styles.titleItem}>{item.title}</Text>
          </View>
          <View style={styles.wrapContentBottom}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <AntDesign name="star" color="#D4AF37" size={7} />
              <Text style={styles.subTitle}>{item.score}</Text>
            </View>
            <Text style={styles.subTitle}>{item.type}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{flex: 1, width: "100%"}}>
      <ActivityIndicator size="large" color="#00ff00" animating={isLoading} style={{zIndex: 99}} /> 
      <FlatList 
        data={data}
        renderItem={_renderItem}
        keyExtractor={(item: any) => item.mal_id.toString()}
        style={{marginTop: -30}}
        horizontal={false}
        numColumns={2}
        columnWrapperStyle={{padding: 5, justifyContent: "center", alignItems: "center"}}
      />
    </View>
  )
}

export default ListSearch

const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: "#252836",
    borderRadius: 11,
    overflow: "hidden",
    margin: 10
  },
  imageItem: {
    width: Dimensions.get('screen').width * 0.45,
    height: 155,
    resizeMode: "cover",
  },
  wrapContent: {
    padding: 10,
    justifyContent: "space-between"
  },
  titleItem: {
    color: "white",
    fontSize: 17,
    fontFamily: "montserrat-medium",
    flexWrap: "wrap",
    flex: 1
  },
  wrapContentBottom: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  subTitle: {
    color: "white",
    fontSize: 13,
    fontFamily: "montserrat-regular",
    marginLeft: 5
  }
})
