import React from 'react'
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import ListScreen from '../screens/ListScreen';
const HeadLogo = require('../assets/images/HeadLogo.png');

const Drawer = createDrawerNavigator();

const DrawerNavigation = ({ navigation }) => {

  const CustomSidebarMenu = (props) => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/*Top Large Image */}
        <Image
          source={HeadLogo}
          style={styles.sideMenuProfileIcon}
        />
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem
            label="Popular Anime"
            onPress={() => navigation.navigate("ListScreen", {itemType: "anime",title: "Popular Anime",type: "bypopularity"})}
          />
        </DrawerContentScrollView>
      </SafeAreaView>
    );
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#2f95dc',
          itemStyle: { marginVertical: 5 },
          style: {backgroundColor: "#252836"}
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
      >
        <Drawer.Screen
          name="ListScreen"
          component={ListScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default DrawerNavigation

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'contain',
    width: 150,
    height: 95,
    alignSelf: 'center',
  },
})
