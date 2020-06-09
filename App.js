import React from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { purple } from './utils/colors';
import FitStatusBar from './components/FitStatusBar';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './components/Navigation/MainNavigator';


const store = createStore(reducers);

export default class App extends React.Component {

  state = {
    opacity: new Animated.Value(0),            // create new Animated type property with initial value 0f 0
    width: new Animated.Value(0),
    height: new Animated.Value(0),
  }

  componentDidMount() {
    const { opacity, width, height } = this.state;        // destructuring state

    // uses timig type of Animated which is provided by react-navtive
    Animated.timing(opacity, { toValue: 1, duration: 1000 })        // specify that opacity value should go to 1 in 1 second
      .start()                                                        // start the animation using start() of Animated

    // uses 'spring' type of Animated which is provided by react-navtive
    Animated.spring(width, { toValue: 300, speed: 5 }).start()        // specify that width value should go to 300 with speed of 5. we not using duration here because we are using 'spring' type of Animated library
    Animated.spring(height, { toValue: 300, speed: 5 }).start()        // specify that width value should go to 300 with speed of 5. we not using duration here because we are using 'spring' type of Animated library

  }

  render() {
    const { opacity, width, height } = this.state;
    return (
      // <Provider store={store}>
      //   <View style={{ flex: 1 }}>
      //     <FitStatusBar backgroundColor={purple} barStyle='light-content' />
      //     <NavigationContainer>
      //       <MainNavigator />
      //     </NavigationContainer>
      //   </View>
      // </Provider>
      <View style={styles.container}>
        <Animated.Image style={[styles.img, { opacity, width, height }]}
          source={{ uri: 'https://tylermcginnis.com/tylermcginnis_glasses-300.png' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: 200,
    height: 200,
  }
})