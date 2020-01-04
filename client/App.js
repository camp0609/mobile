import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import signUp from './src/screens/signUp';
import signIn from './src/screens/signIn';
import frontPage from './src/screens/frontPage';
import camera from './src/screens/camera';
import userHome from './src/screens/userHome';
import search from './src/screens/search';
import resolveAuth from './src/screens/resolveAuth';
import { StoreProvider, createStore } from 'easy-peasy';
import model from './src/model';
import { setNavigator } from './src/navigationRef';

const switchNavigator = createSwitchNavigator({
  resolveAuth: resolveAuth,
  
  loginFlow: createStackNavigator({
    signUp,
    signIn
  }),

  mainFlow: createBottomTabNavigator({
    frontPage,
    camera,
    userHome,
    search
  })
});

const AppContainer = createAppContainer(switchNavigator);

const store = createStore(model);


export default class App extends Component {
  render () {
    return (
        <StoreProvider store={store}>
          <AppContainer ref = {(navigator) => {setNavigator(navigator)}}/>
        </StoreProvider>
    )
  }
}