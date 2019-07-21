/*This is an example of React Native App Intro Slider */
import React from 'react';
//import react in project 
import { StyleSheet, View, Text } from 'react-native';
//import all the required component
import AppIntroSlider from 'react-native-app-intro-slider';
//import AppIntroSlider to use it
import { NavigationActions,StackActions } from 'react-navigation'
export default class App extends React.Component {
    static navigationOptions = ({header: null})
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
      //To show the main page of the app
    };
  }
  componentWillUpdate(){
    if(this.state.showRealApp)
    {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Home'})
            ]
          })
          this.props.navigation.dispatch(resetAction)
    }
}
  _onDone = () => {
    // After user finished the intro slides. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  };
  _onSkip = () => {
    // After user skip the intro slides. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  };
  render() {
    //If false show the Intro Slides
      return (
        <AppIntroSlider
          slides={slides}
          //comming from the JsonArray below
          onDone={this._onDone}
          //Handler for the done On last slide
          showSkipButton={true}
          onSkip={this._onSkip}
        />
      );
    }
}
const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    borderRadius: 40
  },
  text: {
    color: '#FFFFFF',
    fontSize: 30,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginTop: 16,
  },
});
 
const slides = [
  {
    key: 's1',
    text: ' Feeding India to eradicate hunger, malnutrition and food wastage in India. ',
    title: 'Donate',
    titleStyle: styles.title,
    textStyle: styles.text,
    image:require('./donate.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#20d2bb',
  },
  {
    key: 's2',
    title: 'Procure',
    titleStyle: styles.title,
    text: ' A platform where excess cooked food is procured and distributed among hungry as well as needy people.',
    textStyle: styles.text,
    image: require('./procure.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#febe29',
  },
  {
    key: 's3',
    title: 'Easy Delivery',
    titleStyle: styles.title,
    text: 'Get your Food Delivered. Hassle Free! ',
    textStyle: styles.text,
    image: require('./Delivery.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#22bcb5',
  }
];