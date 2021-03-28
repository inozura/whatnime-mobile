import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, Image, ImageBackground, StatusBar } from 'react-native'

import { getDetailManga, getCharacter } from '../../model/jikanAPI';
import WindowVal from '../../constants/Layout'
import Card from '../../components/Card';
import GenreList from '../../components/GenreList';
import ListCharaStaff from '../../components/ListCharaStaff';
import ListRelated from '../../components/ListRelated';

const IconSad = require("../../assets/images/suzumiya-sad.png");
const LoadingGif = require("../../assets/images/LoadingChara.gif");

const DetailManga = ({route, navigation}: any) => {
  const [dataDetail, setDataDetail] = useState<any>();
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const [dataCharacter, setDataCharacter] = useState<any>();
  const [colorStatusbar, setColorStatusbar] = useState<'#1f1f1f' | 'transparent'>('transparent');

  useEffect(() => {
    let {id} = route.params
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const fetchDetail = await getDetailManga(id);
        const charaStaff = await getCharacter(id);
        setDataDetail(fetchDetail);
        setDataCharacter(charaStaff);
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
    return () => {
      setIsLoading(true);
      setDataDetail([]);
    }
  }, [])

  const handleOnScroll = (event) => {
    // console.log(event.nativeEvent.contentOffset.y);
    if(event.nativeEvent.contentOffset.y <= 187.45) {
      setColorStatusbar('transparent');
    } else if(event.nativeEvent.contentOffset.y >= 187.45) {
      setColorStatusbar('#1f1f1f');
    }
  }

  return isLoading ? (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1f1f1f"}}>
      <Image source={LoadingGif} />
    </View>
  ) : (
    <ScrollView 
      style={{backgroundColor: "#1f1f1f", flex: 1}}
      onScroll={handleOnScroll}
    >
      <StatusBar 
        backgroundColor={colorStatusbar} 
        translucent={true}
      />
      <ImageBackground
        source={{uri: dataDetail.image_url}}
        style={styles.backgroundImage}
      >
        <View style={{flex: 1, width: "100%", backgroundColor: "rgba(0,0,0, 0.5)"}}/>
      </ImageBackground>
      {/* Main Head */}
      <View style={styles.mainHead}>
        <Image
          source={{uri: dataDetail.image_url}}
          style={styles.mainImage}
        />
        <View style={styles.mainContentHead}>
          <View style={{flexDirection: "row"}}>
            <Text style={styles.title}>{dataDetail.title}</Text>
          </View>
        </View>
      </View>

      {/* Score */}
      <Card style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 20, marginTop: 15, paddingHorizontal: 30}}>
        <View>
          <Text style={styles.paragraf}>Score: {dataDetail.score ? dataDetail.score : "-"}</Text>
        </View>
        <View style={styles.separator} />
        <View>
          <Text style={styles.paragraf}>Rank: {dataDetail.rank ? dataDetail.rank : "-"}</Text>
        </View>
        <View style={styles.separator} />
        <View>
          <Text style={styles.paragraf}>Popularity: {dataDetail.popularity ? dataDetail.popularity : "-"}</Text>
        </View>
      </Card>

      <View style={{marginHorizontal: 20, marginTop: 10}}>
        <Text style={styles.titleSection}>Synopsis</Text>
        <Text style={styles.paragraf}>{dataDetail.synopsis}</Text>
      </View>

      {/* Genres */}
      <View style={{flexDirection: "row", marginTop: 10}}>
        <GenreList data={dataDetail.genres} />
      </View>

      {/* Alternative Title */}
      <Card style={{marginHorizontal: 20, marginTop: 15}}>
        <Text style={{color: "white", fontSize: 15, fontFamily: "montserrat-medium", marginBottom: 5}}>Title</Text>
        <View style={{marginTop: 7}}>
          <Text style={styles.subTitleSection}>Synonyms</Text>
          <Text style={styles.paragraf}>{dataDetail.title_synonyms.length !== 0 ? dataDetail.title_synonyms[0] : "-"}</Text>
        </View>
        <View style={{marginTop: 7}}>
          <Text style={styles.subTitleSection}>English</Text>
          <Text style={styles.paragraf}>{dataDetail.title_english ? dataDetail.title_english : "-"}</Text>
        </View>
        <View style={{marginTop: 7}}>
          <Text style={styles.subTitleSection}>Japanese</Text>
          <Text style={styles.paragraf}>{dataDetail.title_japanese ? dataDetail.title_japanese : "-"}</Text>
        </View>
      </Card>

      {/* More Information */}
      <Card style={{marginHorizontal: 20, marginTop: 15, marginBottom: 10}}>
        <Text style={{color: "white", fontSize: 15, fontFamily: "montserrat-medium", marginBottom: 5}}>More Information</Text>
        <View style={styles.wrapInformation}>
          <View style={{width: "50%"}}>
            <View style={{marginTop: 7}}>
              <Text style={styles.subTitleSection}>Type</Text>
              <Text style={styles.paragraf}>{dataDetail.type ? dataDetail.type : "-"}</Text>
            </View>
            <View style={{marginTop: 7}}>
              <Text style={styles.subTitleSection}>Status</Text>
              <Text style={styles.paragraf}>{dataDetail.status ? dataDetail.status : "-"}</Text>
            </View>
            <View style={{marginTop: 7}}>
              <Text style={styles.subTitleSection}>Volumes</Text>
              <Text style={styles.paragraf}>{dataDetail.volumes ? dataDetail.volumes : "-"}</Text>
            </View>
            <View style={{marginTop: 7}}>
              <Text style={styles.subTitleSection}>Chapters</Text>
              <Text style={styles.paragraf}>{dataDetail.chapters ? dataDetail.chapters : "-"}</Text>
            </View>
            <View style={{marginTop: 7}}>
              <Text style={styles.subTitleSection}>Published</Text>
              <Text style={styles.paragraf}>{dataDetail.published.from ? dataDetail.published.from.slice(0, 10) : "-"} to {dataDetail.published.to ? dataDetail.published.to.slice(0, 10) : "-"}</Text>
            </View>
          </View>

          <View style={{width: "50%"}}>
            <View style={{marginTop: 7}}>
              <Text style={styles.subTitleSection}>Broadcast</Text>
              <Text style={styles.paragraf}>{dataDetail.broadcast ? dataDetail.broadcast : "-"}</Text>
            </View>
            <View style={{marginTop: 7}}>
              <Text style={styles.subTitleSection}>Scored by User</Text>
              <Text style={styles.paragraf}>{dataDetail.scored_by ? dataDetail.scored_by : "-"}</Text>
            </View>
            <View style={{marginTop: 7}}>
              <Text style={styles.subTitleSection}>Favorites</Text>
              <Text style={styles.paragraf}>{dataDetail.favorites ? dataDetail.favorites : "-"}</Text>
            </View>
            <View style={{marginTop: 7}}>
              <Text style={styles.subTitleSection}>Rank</Text>
              <Text style={styles.paragraf}>{dataDetail.rank ? dataDetail.rank : "-"}</Text>
            </View>
            <View style={{marginTop: 7}}>
              <Text style={styles.subTitleSection}>Members</Text>
              <Text style={styles.paragraf}>{dataDetail.members ? dataDetail.members : "-"}</Text>
            </View>
          </View>
        </View>
      </Card>
    </ScrollView>
  )
}

export default DetailManga

const styles = StyleSheet.create({
  backgroundImage: {
    height: 210,
    width: "100%",
    top: 0,
    left: 0,
    right: 0,
    resizeMode: "cover"
  },
  mainHead: {
    flexDirection: "row",
    paddingHorizontal: WindowVal.spacing,
    width: "100%",
    flex: 1,
  },
  mainImage: {
    height: 150,
    width: 110,
    resizeMode: "cover",
    borderRadius: 5,
    marginTop: -50
  },
  mainContentHead: {
    flexDirection: "column",
    width: "100%",
    flexWrap: "wrap",
    flex: 1,
    justifyContent: "center"
  },
  title: {
    flexWrap: "wrap",
    flex: 1,
    color: "white",
    fontSize: 17,
    fontFamily: "montserrat-extra-bold",
    marginLeft: 10,
  },
  titleSection: {
    color: "white", 
    fontSize: 15, 
    fontFamily: "montserrat-medium", 
    marginBottom: 5
  },
  subTitleSection: {
    color: "#c9c9c9", 
    fontSize: 13, 
    fontFamily: "montserrat-regular",
    marginBottom: 3
  },
  paragraf: {
    color: "white", 
    fontSize: 13, 
    fontFamily: "montserrat-regular"
  },
  containerDescription: {
    paddingHorizontal: 20,
    marginTop: 5
  },
  wrapDescription: {
    flex: 1
  },
  separator: {
    marginVertical: 10,
    width: 1,
    height: '100%',
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  wrapInformation: {
    flexDirection: "row",
  }
})
