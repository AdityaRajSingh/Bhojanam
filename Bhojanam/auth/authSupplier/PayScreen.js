import React, { Component } from 'react';
import { View, Image ,StyleSheet} from 'react-native';

export default class PayScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('./pay.jpg')} style={styles.image}/>
            </View>
        )
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