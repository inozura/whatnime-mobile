import React, {useEffect, useState, useLayoutEffect} from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, Text, View, ActivityIndicator, Image, Dimensions } from 'react-native'
import { getListDynamic } from '../model/jikanAPI'
import { RootStackParamList } from '../types';
import { AntDesign } from '@expo/vector-icons';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

type Props = StackScreenProps<RootStackParamList, 'ListScreen'>;

const ListScreen = ({route, navigation}: Props) => {
  const [dataFetched, setDataFetched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);
  
  let {type, subType, title, itemType} = route.params;

  const _loadingComponent = () => isLoading ? (
    <View style={{marginVertical: 10, justifyContent: "center"}}>
      <ActivityIndicator color="#2f95dc" size="large" />
    </View>
  ) : null

  const _backButton = () => (
    <TouchableOpacity
      style={{marginLeft: 15}}
      onPress={() => navigation.goBack()}
    >
      <AntDesign name="arrowleft" color="#fff" size={20} />
    </TouchableOpacity>
  )

  const _renderItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.containerItem}
      onPress={() => navigation.navigate(itemType === "anime" ? 'DetailAnime' : 'DetailManga', {id: item.mal_id})}
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

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const {top} = await getListDynamic(type, subType, pageCurrent);
      setDataFetched(dataFetched.concat(top));
    } catch (err) {
      console.warn(err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleLoadmore = async () => {
    setPageCurrent(pageCurrent + 1);
    setIsLoading(true);
  }

  // Header Title
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: _backButton,
      headerTitle: title,
    });

    return () => {
      setDataFetched([])
    }
  }, [])

  // Fecth DATA
  useEffect(() => {
    fetchData();
  }, [pageCurrent])

  // Clean DATA
  // useEffect(() => {
  //   return () => {
  //     setDataFetched([])
  //   }
  // }, [])

  return (
    <View style={{flex: 1, width: "100%", backgroundColor: "#1f1f1f"}}>
      <FlatList 
        renderItem={_renderItem}
        data={dataFetched}
        style={styles.container}
        keyExtractor={(_, index) => index.toString()}
        ListFooterComponent={_loadingComponent}
        onEndReached={handleLoadmore}
        onEndReachedThreshold={5}
        numColumns={2}
        horizontal={false}
        columnWrapperStyle={{padding: 5, justifyContent: "center", alignItems: "center"}}
      />
    </View>
  )
}

export default ListScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    marginTop: 3,
    flex: 1,
    width: "100%"
  },
  containerItem: {
    backgroundColor: "#252836",
    borderRadius: 11,
    overflow: "hidden",
    margin: 10,
  },
  imageItem: {
    width: Dimensions.get('screen').width * 0.45,
    height:145,
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
