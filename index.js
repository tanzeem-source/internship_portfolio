/**
 * @format
 */

import './src/unistyles/unistyles.config';
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 
import App from './App';
import { name as appName } from './app.json';


const Main = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <App />
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => Main);