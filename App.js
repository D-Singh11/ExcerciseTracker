import React from 'react';
import { View, Text, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { purple } from './utils/colors';
import FitStatusBar from './components/FitStatusBar';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './components/Navigation/MainNavigator';
import { setLocalNotification, clearLocalNotification } from './utils/helpers';


const store = createStore(reducers);

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification();                               // ask user for permissions to set notifications when app loads and if permisiions granted set the local notification
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <FitStatusBar backgroundColor={purple} barStyle='light-content' />
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}