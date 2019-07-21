import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ListView,
  TouchableOpacity,
  View,
  Image,
  Text,
  TouchableHighlight
} from 'react-native';
import { NavigationActions,StackActions } from 'react-navigation';
export default class Congratulation extends Component{
  static navigationOptions = ({header: null})
  goBack=()=>{
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'DeliveryProfile'})
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.icon} source={{uri: "https://png.icons8.com/good-quality/ultraviolet/200/3498db"}} />
        <Text style={styles.title}>You have successfully selected the order!</Text>
        <Text style={styles.description}>Kindly be at the pickup location on time. </Text>
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.goBack}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    paddingTop:50,
  },
  icon:{
    width:200,
    height:200,
  },
  title:{
    fontSize:24,
    textAlign: 'center',
    marginTop:22,
    color: "#5F6D7A"
  },
  description: {
    marginTop:20,
    textAlign: 'center',
    color: "#A9A9A9",
    fontSize:16,
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#3498db",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize:20,
  }
});
 