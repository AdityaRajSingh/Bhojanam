import React, { Component } from 'react'
import {View,Image,StyleSheet} from 'react-native';
import { NavigationActions,StackActions } from 'react-navigation'
export default class SplashScreen extends Component {
    static navigationOptions = ({header: null})
    state={
        loading:true
    }
    componentWillMount(){
        setTimeout(()=>{
            this.setState({loading:false})
        },2000)
    }
    componentWillUpdate(){
        if(this.state.loading)
        {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'Intro'})
                ]
              })
              this.props.navigation.dispatch(resetAction)
        }
    }
    render() {
            const viewStyles = [
                { backgroundColor: 'white',flex:1 }
              ];
              return (
                <View style={styles.container}>
                  <Image source={require('./cover.jpg')} style={styles.image}/>
                </View>
              );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});