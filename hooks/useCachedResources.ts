import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          'montserrat-extra-bold': require('../assets/fonts/Montserrat-ExtraBold.ttf'),
          'montserrat-light-italic': require('../assets/fonts/Montserrat-LightItalic.ttf'),
          'montserrat-medium': require('../assets/fonts/Montserrat-Medium.ttf'),
          'montserrat-regular': require('../assets/fonts/Montserrat-Regular.ttf'),
          'montserrat-thin': require('../assets/fonts/Montserrat-Thin.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
