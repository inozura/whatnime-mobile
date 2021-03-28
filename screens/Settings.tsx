import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';

import {AntDesign} from '@expo/vector-icons'

const Logo = require('../assets/images/HeadLogo.png')

const Settings = () => {
  return (
    <SafeAreaView
      style={styles.container}
    >
      <ScrollView>
        {/* Logo */}
        <View style={styles.wrapImage}>
          <Image source={Logo} style={styles.imageLogo}/>
        </View>
        <Text style={[styles.subTitle, {textAlign: "center"}]}>Version 1.0.0</Text>

        {/* FAQ */}
        <TouchableOpacity
          style={styles.itemContainer}
        >
          <AntDesign name="questioncircleo" size={25} color="#fff" />
          <View style={styles.wrapTitle}>
            <Text style={styles.title}>F.A.Q</Text>
            <Text style={styles.subTitle}>Answer to some of the common questions.</Text>
          </View>
        </TouchableOpacity>

        {/* About */}
        <TouchableOpacity
          style={styles.itemContainer}
        >
          <AntDesign name="infocirlceo" size={25} color="#fff" />
          <View style={styles.wrapTitle}>
            <Text style={styles.title}>About App</Text>
            <Text style={styles.subTitle}>Developers and app licenses.</Text>
          </View>
        </TouchableOpacity>

        {/* Rate view */}
        <TouchableOpacity
          style={styles.itemContainer}
        >
          <AntDesign name="staro" size={25} color="#fff" />
          <View style={styles.wrapTitle}>
            <Text style={styles.title}>Rate and Review App</Text>
            <Text style={styles.subTitle}>Leave a rating and review the app.</Text>
          </View>
        </TouchableOpacity>

        {/* Donate */}
        <TouchableOpacity
          style={styles.itemContainer}
        >
          <AntDesign name="gift" size={25} color="#fff" />
          <View style={styles.wrapTitle}>
            <Text style={styles.title}>Donate</Text>
            <Text style={styles.subTitle}>Support the developer.</Text>
          </View>
        </TouchableOpacity>

        {/* Feedback */}
        <TouchableOpacity
          style={styles.itemContainer}
        >
          <AntDesign name="customerservice" size={25} color="#fff" />
          <View style={styles.wrapTitle}>
            <Text style={styles.title}>Send Feedback</Text>
            <Text style={styles.subTitle}>Send feedback and sugestions.</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f1f1f",
    width: "100%",
  },
  itemContainer: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  wrapTitle: {
    marginLeft: 10
  },
  title: {
    color: "white",
    fontSize: 14,
    fontFamily: "montserrat-medium",
    marginBottom: 3
  },
  subTitle: {
    color: "#c9c9c9",
    fontSize: 13,
    fontFamily: "montserrat-regular",
  },
  wrapImage: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  imageLogo: {
    width: 150,
    height: 95,
    marginTop: 35,
    marginBottom: 10
  }
});
