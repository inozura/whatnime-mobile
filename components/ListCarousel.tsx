import React from 'react'
import Carousel from 'react-native-snap-carousel'
import { ImageBackground, StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import {  LinearGradient  } from 'expo-linear-gradient'
import WindowVal from '../constants/Layout'

interface propsTypeRenderItem {
  item: {
    mal_id: number,
    rank: number,
    title: string,
    url: string,
    image_url: string,
    type: string,
    start_date: string,
    end_date: string,
    members: string,
    score: number,
  },
}

// Init Responsive Width slider
const itemHorizontalMargin = Math.round((3 * WindowVal.window.width) / 100);
const sliderWidth = Math.round((75 * WindowVal.window.width) / 100);
const slideHeight = WindowVal.window.height * 0.3;
const itemWidth = Math.round((sliderWidth + itemHorizontalMargin) * 0.63);
console.log(itemWidth);

const ListCarousel = ({data, navigation}: any) => {
  const [activeSlide, setActiveSlide] = React.useState(0)

  const _renderItemWithParallax = ({item}: propsTypeRenderItem) => {
    return (
        <TouchableOpacity
          style={styles.containerItem}
          key={item.mal_id}
          onPress={() => navigation.navigate('DetailAnime', {id: item.mal_id})}
        >
          <ImageBackground 
            source={{uri: item.image_url}}
            style={styles.backgroundItem}
            imageStyle={styles.backgroundItem}
          >
            <LinearGradient
              colors={["rgba(0,0,0, 0.1)", "rgba(0,0,0, 0.9)"]}
              start={{x:0, y: 0}}
              style={{flex: 1, width: "100%"}}
            >
              <View style={styles.wrapItem}>
                <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={_renderItemWithParallax}
        sliderWidth={WindowVal.window.width}
        itemWidth={itemWidth}
        firstItem={activeSlide}
        inactiveSlideScale={0.9}
        inactiveSlideOpacity={0.7}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContentContainer}
        onSnapToItem={(index) => setActiveSlide(index)}
        keyExtractor={(item, index:number) => index.toString()}
        loop
        loopClonesPerSide={5}
      />
    </View>
  )
}

export default ListCarousel

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  containerItem: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18,
    borderRadius: 15,
    overflow: "hidden"
  },
  backgroundItem: {
    flex: 1,
    width: "100%",
    borderRadius: 15,
    resizeMode: "cover",
    overflow: "hidden"
  },
  wrapItem: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: 15
  },
  title: {
    flexWrap: "wrap",
    color: "white",
    fontSize: 15,
    fontFamily: "montserrat-medium",
  },
  slider: {
    marginTop: 15,
    overflow: "visible"
  },
  sliderContentContainer: {
    paddingVertical: 5
  }
})
