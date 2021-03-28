import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import WindowVal from '../constants/Layout'

const ListItem = ({data, navigation, square, type}: any) => {
  const _renderItem = ({item, index}: any) => {    
    return(
      <TouchableOpacity 
        style={[styles.itemContainer, index === 0 && {marginLeft: WindowVal.spacing}, square && {width: 150, height: 140}]}
        onPress={() => navigation.navigate(type === "anime" ? 'DetailAnime' : "DetailManga", {id: item.mal_id})}
      >
        <ImageBackground
          source={{uri: item.image_url}}
          style={{width: "100%", flex: 1}}
          imageStyle={styles.backgroundItem}
        >
          <LinearGradient
            colors={["rgba(0,0,0, 0.1)", "rgba(0,0,0, 0.9)"]}
            start={{x:0, y: 0}}
            style={{flex: 1, width: "100%"}}
          >
            <View style={styles.wrapContent}>
              <Text style={styles.title}>
                {item.title}
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={data}
        renderItem={_renderItem}
        style={styles.flatListContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={data => data.mal_id.toString()}
      />
    </View>
  )
}

export default ListItem

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  flatListContainer: {
    width: "100%",
    flex: 1
  },
  itemContainer: {
    width: 170,
    height: 105,
    marginHorizontal: 10,
    overflow: "hidden",
    borderRadius: 15,
  },
  backgroundItem: {
    flex: 1,
    borderRadius: 15,
    width: "100%",
    overflow: "hidden"
  },
  wrapContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: 10,
    overflow: "hidden"
  },
  title: {
    fontSize: 13,
    color: "white"
  }
})
