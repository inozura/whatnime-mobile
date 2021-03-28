import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, Image, ImageBackground, StatusBar, SafeAreaView } from 'react-native'
import { Thumbnail } from 'react-native-thumbnail-video';
import {AntDesign} from '@expo/vector-icons'

import { getDetailAnime, getCharaStaff } from '../../model/jikanAPI';
import WindowVal from '../../constants/Layout'
import Card from '../../components/Card';
import GenreList from '../../components/GenreList';
import ListCharaStaff from '../../components/ListCharaStaff';
import ListRelated from '../../components/ListRelated';

const IconSad = require("../../assets/images/suzumiya-sad.png");
const LoadingGif = require("../../assets/images/LoadingChara.gif");

const DetailAnime = ({route, navigation}: any) => {
  const [dataDetail, setDataDetail] = useState<any>();
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const [dataCharaStaff, setDataCharaStaff] = useState<any>();
  const [colorStatusbar, setColorStatusbar] = useState<'#1f1f1f' | 'transparent'>('transparent');

  useEffect(() => {
    let {id} = route.params
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const fetchDetail = await getDetailAnime(id);
        const charaStaff = await getCharaStaff(id);
        setDataDetail(fetchDetail);
        setDataCharaStaff(charaStaff);
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

      {/* Trailer */}
      <View style={{marginTop: 15, width: "100%"}}>
        {
          dataDetail.trailer_url ? (
            <Thumbnail 
              url={dataDetail.trailer_url} 
            />
          ) : (
            <View style={{justifyContent: "center", alignItems: "center", height: 200}}>
              <Image source={IconSad} style={{width: "51%", height: "51%", resizeMode: "contain"}}/>
              <Text style={{color: "white"}}>Sorry No Video Preview</Text>
            </View>
          )
        }
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
          <Text style={styles.paragraf}>{dataDetail.title_synonyms ? dataDetail.title_synonyms[0] : "-"}</Text>
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
      <Card style={{marginHorizontal: 20, marginTop: 15}}>
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
              <Text style={styles.subTitleSection}>Episodes</Text>
              <Text style={styles.paragraf}>{dataDetail.episodes ? dataDetail.episodes : "-"}</Text>
            </View>
            <View style={{marginTop: 7}}>
              <Text style={styles.subTitleSection}>Aired</Text>
              <Text style={styles.paragraf}>{dataDetail.aired.from ? dataDetail.aired.from.slice(0, 10) : "-"} to {dataDetail.aired.to ? dataDetail.aired.to.slice(0, 10) : "-"}</Text>
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

          <View style={{width: "50%"}}>
            <View style={{marginTop: 7}}>
              <Text style={styles.subTitleSection}>Studio</Text>
              <Text style={styles.paragraf}>{dataDetail.studios.length !== 0 ? dataDetail.studios[0].name : "-"}</Text>
            </View>
            <View style={{marginTop: 7}}>
              <Text style={styles.subTitleSection}>Source</Text>
              <Text style={styles.paragraf}>{dataDetail.source ? dataDetail.source : "-"}</Text>
            </View>
            <View style={{marginTop: 7}}>
              <Text style={styles.subTitleSection}>Broadcast</Text>
              <Text style={styles.paragraf}>{dataDetail.broadcast ? dataDetail.broadcast : "-"}</Text>
            </View>
            <View style={{marginTop: 7}}>
              <Text style={styles.subTitleSection}>Rating</Text>
              <Text style={styles.paragraf}>{dataDetail.rating ? dataDetail.rating : "-"}</Text>
            </View>
            <View style={{marginTop: 7}}>
              <Text style={styles.subTitleSection}>Scored by User</Text>
              <Text style={styles.paragraf}>{dataDetail.scored_by ? dataDetail.scored_by : "-"}</Text>
            </View>
            <View style={{marginTop: 7}}>
              <Text style={styles.subTitleSection}>Favorites</Text>
              <Text style={styles.paragraf}>{dataDetail.favorites ? dataDetail.favorites : "-"}</Text>
            </View>
          </View>
        </View>
      </Card>

      {/* Theme Song */}
      <Card style={{marginHorizontal: 20, marginTop: 15}}>
        <Text style={{color: "white", fontSize: 15, fontFamily: "montserrat-medium", marginBottom: 5}}>Theme Songs</Text>
        <View style={{marginTop: 7}}>
          <Text style={styles.subTitleSection}>Opening Theme</Text>
          <Text style={styles.paragraf}>{dataDetail.opening_themes ? dataDetail.opening_themes[0] : "-"}</Text>
        </View>
        <View style={{marginTop: 7}}>
          <Text style={styles.subTitleSection}>Ending Theme</Text>
          <Text style={styles.paragraf}>{dataDetail.ending_themes ? dataDetail.ending_themes[0] : "-"}</Text>
        </View>
      </Card>

      {/* List Character */}
      <View style={{marginTop: 10}}>
        <Text style={[styles.titleSection, {marginLeft: 20, marginBottom: 10}]}>Characters</Text>
        <ListCharaStaff data={dataCharaStaff.characters} />
      </View>

      {/* List Staff */}
      <View style={{marginTop: 10}}>
        <Text style={[styles.titleSection, {marginLeft: 20, marginBottom: 10}]}>Staff</Text>
        <ListCharaStaff data={dataCharaStaff.staff} />
      </View>

      {/* Related */}
      {/* {
        dataDetail.related.length !== 0 && (
        <View style={{marginTop: 10}}>
          <Text style={[styles.titleSection, {marginLeft: 20, marginBottom: 10}]}>Related</Text>
          <ListRelated data={dataDetail.related} />
        </View>
        )
      } */}
    </ScrollView>
  )
}

export default DetailAnime

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
