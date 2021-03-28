import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          Search: {
            screens: {
              SearchScreen: 'search',
            },
          },
          Settings: {
            screens: {
              SettingsScreen: 'settings',
            },
          },
        },
      },
      NotFound: '*',
      DetailAnime: "*"
    },
  },
};
