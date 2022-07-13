import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,
  Image,
  View,
  Dimensions,
} from "react-native";
import ListCarousel from "../components/ListCarousel";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  getAnimeAiring,
  getAnimeMovie,
  getAnimeUpcoming,
  getPopularAnime,
  getTopManga,
  getTopNovels,
} from "../model/jikanAPI";
import ListItem from "../components/ListItem";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const LoadingGif = require("../assets/images/LoadingChara.gif");
const Logo = require("../assets/images/MainLogo.png");

interface dataTypeFetched {
  request_hash: string;
  request_cached: boolean;
  request_cache_expiry: number;
  top: Array<{
    mal_id: string;
    rank: number;
    title: string;
    url: string;
    image_url: string;
    type: string;
    start_date: string;
    end_date: string;
    members: string;
    score: number;
  }>;
}

interface dataTypeMangaFetched {
  request_hash: string;
  request_cached: boolean;
  request_cache_expiry: number;
  top: Array<{
    mal_id: string;
    rank: number;
    title: string;
    url: string;
    image_url: string;
    type: string;
    start_date: string;
    end_date: string;
    members: string;
    score: number;
  }>;
}

const Home = ({ navigation }: any) => {
  const [animeUpcoming, setAnimeUpcoming] = useState<dataTypeFetched["top"]>(
    []
  );
  const [popularAnime, setPopularAnime] = useState<dataTypeFetched["top"]>();
  const [airingAnime, setAiringAnime] = useState<dataTypeFetched["top"]>();
  const [movieAnime, setMovieAnime] = useState<dataTypeFetched["top"]>();
  const [topManga, setTopManga] = useState<dataTypeMangaFetched["top"]>();
  const [topNovels, setTopNovels] = useState<dataTypeMangaFetched["top"]>();
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      setIsLoading(true);

      const dataUpcoming = await getAnimeUpcoming();
      const dataPopularAnime = await getPopularAnime();
      const dataAiringAnime = await getAnimeAiring();
      const dataMovieAnime = await getAnimeMovie();
      const dataTopManga = await getTopManga();
      const dataTopNovels = await getTopNovels();

      // set to state
      setAnimeUpcoming(dataUpcoming.top);
      setPopularAnime(dataPopularAnime.top);
      setAiringAnime(dataAiringAnime.top);
      setMovieAnime(dataMovieAnime.top);
      setTopManga(dataTopManga.top);
      setTopNovels(dataTopNovels.top);
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();

    return () => {
      setAiringAnime([]);
      setAnimeUpcoming([]);
      setIsLoading(true);
      setMovieAnime([]);
      setPopularAnime([]);
      setTopManga([]);
      setTopNovels([]);
    };
  }, []);

  return isLoading ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1f1f1f",
      }}
    >
      <Image source={LoadingGif} />
      <StatusBar barStyle="light-content" />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      {/* <DrawerNavigation navigation={navigation} /> */}
      <ScrollView style={{ marginBottom: 50 }}>
        <StatusBar barStyle="light-content" />
        <View style={styles.headWrap}>
          <Text style={styles.headTitle}>Whatnime</Text>
          <Image
            source={Logo}
            width={20}
            height={15}
            resizeMode="contain"
            style={styles.logoImage}
          />
        </View>
        <ListCarousel
          data={animeUpcoming && animeUpcoming.slice(0, 10)}
          navigation={navigation}
        />

        {/* Popular ANIME */}
        <View style={styles.containerSection}>
          <View style={styles.headingSecttion}>
            <Text style={styles.titleHeadingSection}>Popular Anime</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ListScreen", {
                  itemType: "anime",
                  title: "Popular Anime",
                  type: "bypopularity",
                })
              }
            >
              <AntDesign name="arrowright" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <ListItem data={popularAnime} navigation={navigation} type="anime" />
        </View>

        {/* Airing ANIME */}
        <View style={styles.containerSection}>
          <View style={styles.headingSecttion}>
            <Text style={styles.titleHeadingSection}>Airing Anime</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ListScreen", {
                  itemType: "anime",
                  title: "Airing Anime",
                  type: "airing",
                })
              }
            >
              <AntDesign name="arrowright" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <ListItem
            data={airingAnime}
            navigation={navigation}
            square
            type="anime"
          />
        </View>

        {/* Movie */}
        <View style={styles.containerSection}>
          <View style={styles.headingSecttion}>
            <Text style={styles.titleHeadingSection}>Best Movie</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ListScreen", {
                  itemType: "anime",
                  title: "TOP Movie",
                  type: "movie",
                })
              }
            >
              <AntDesign name="arrowright" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <ListItem data={movieAnime} navigation={navigation} type="anime" />
        </View>

        {/* Top Manga */}
        <View style={styles.containerSection}>
          <View style={styles.headingSecttion}>
            <Text style={styles.titleHeadingSection}>Top Manga</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ListScreen", {
                  itemType: "manga",
                  title: "Top Manga",
                  type: "manga",
                  subType: "manga",
                })
              }
            >
              <AntDesign name="arrowright" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <ListItem
            data={topManga}
            navigation={navigation}
            square
            type="manga"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#1f1f1f",
    overflow: "hidden",
  },
  containerLoading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  separator: {
    marginVertical: 10,
    width: 1,
    height: "80%",
  },
  containerSection: {
    marginVertical: 15,
  },
  headingSecttion: {
    paddingHorizontal: 20,
    marginBottom: 9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "transparent",
  },
  titleHeadingSection: {
    flexWrap: "wrap",
    color: "white",
    fontSize: 15,
    fontFamily: "montserrat-medium",
  },
  headWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  logoImage: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  headTitle: {
    color: "white",
    fontSize: 27,
    fontFamily: "montserrat-extra-bold",
  },
});
