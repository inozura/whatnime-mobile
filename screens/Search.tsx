import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TextInput, ActivityIndicator, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { getSearchAnime } from '../model/jikanAPI';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListSearch from '../components/ListSearch';

const IconType = require('../assets/images/suzumiya-typing.png');

const Search = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [dataSearch, setDataSearch] = useState();

  useEffect(() => {
    return () => {
      setIsLoading(false);
    }
  })

  const handleSearch = async (text: string) => {
    try {
      setIsLoading(true);
      const {results} = await getSearchAnime(text);
      setDataSearch(results);
    } catch (err) {
      console.warn(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginTop: 10}}>
        <View style={styles.searchWrap}>
          <AntDesign name="search1" color="white" size={20} />
          <TextInput
            style={styles.searchInput} 
            placeholder="Fullmetal Archivment"
            placeholderTextColor="#bbbbbb"
            onSubmitEditing={text => handleSearch(text.nativeEvent.text)}
            returnKeyType="search"
          />
        </View>
        <View style={styles.mainContent}>
          {
            !dataSearch ? (
              <View style={[StyleSheet.absoluteFillObject, {justifyContent: "center", alignItems: "center", marginTop: -105}]}>
                <ActivityIndicator size="large" color="#00ff00" animating={isLoading} style={{zIndex: 99}} />
                <Image source={IconType} style={{width: "35%", height: "35%", resizeMode: "contain"}} />
                <Text style={{color: "white"}}>Type Something</Text>
              </View>
            ) : (
              <ListSearch data={dataSearch} isLoading={isLoading} navigation={navigation}/>
            )
          }
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#1f1f1f"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchInput: {
    fontSize: 20,
    marginLeft: 5,
    width: '90%',
    height: 50,
    backgroundColor: '#252836',
    borderRadius: 7,
    color: "white",
    padding: 15,
  },
  searchWrap: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  mainContent: {
    width: "100%",
    height: "100%",
  }
});
