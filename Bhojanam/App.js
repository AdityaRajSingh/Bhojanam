import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './components/HomeScreen';
import SupplierSignUpScreen from './auth/authSupplier/SupplierSignUpScreen'
import SupplierProfileScreen from './auth/authSupplier/SupplierProfileScreen'
import SupplierSignInScreen from './auth/authSupplier/SupplierSignInScreen'
import DeliverySignInScreen from './auth/authDelivery/DeliverySignInScreen'
import DeliveryProfileScreen from './auth/authDelivery/DeliveryProfileScreen'
import DeliverySignUpScreen from './auth/authDelivery/DeliverySignUpScreen'
import NeedySignUpScreen from './auth/authNeedy/NeedySignUpScreen'
import SplashScreen from "./SplashScreen";
import IntroScreen from "./IntroScreen";
import DeliveryRegisteredScreen from './auth/authDelivery/DeliveryRegisteredScreen'
import NeedyRegisteredScreen from './auth/authNeedy/NeedyRegisteredScreen';
import PayScreen from './auth/authSupplier/PayScreen';
import DeliveryOrderScreen from './auth/authDelivery/DeliveryOrderScreen'
import SupplierOrderScreen from './auth/authSupplier/SupplierOrderScreen'
import SupplierRegisteredScreen from './auth/authSupplier/SupplierRegisteredScreen'

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    SupplierProfile: SupplierProfileScreen,
    DeliveryProfile:DeliveryProfileScreen,
    SupplierSignUp:SupplierSignUpScreen,
    SupplierSignIn:SupplierSignInScreen,
    DeliverySignIn:DeliverySignInScreen,
    DeliverySignUp:DeliverySignUpScreen,
    NeedySignUp:NeedySignUpScreen,
    Splash:SplashScreen,
    Intro:IntroScreen,
    NeedyRegistered:NeedyRegisteredScreen,
    Pay:PayScreen,
    DeliveryOrder:DeliveryOrderScreen,
    SupplierOrder:SupplierOrderScreen,
    DeliveryRegistered:DeliveryRegisteredScreen,
    SupplierRegistered:SupplierRegisteredScreen
  },
  {
    initialRouteName: 'Splash',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#FC8019',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);
const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
