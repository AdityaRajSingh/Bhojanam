import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Text,TouchableOpacity,Image,StyleSheet} from "react-native";
import {Container,Content,Card,CardItem} from 'native-base';
export default class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Home',
      headerLeft: null
    };
    render() {
      
      return (
        <Container style={{flex:1}}>
        <Content padder>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('NeedySignUp')}>
            <Card style={styles.cards}>
            <CardItem cardBody style={styles.carditems}>
          <Image source={require('../pics/Procure.jpg')} resizeMode="contain" style={styles.image}/>
          
          </CardItem>
           
          </Card>
          </TouchableOpacity >
        </Content>
        <Content padder>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('SupplierSignUp')}>
        <Card style={styles.cards}>
        <CardItem cardBody style={styles.carditems}>
          <Image source={require('../pics/Donate.jpg')} resizeMode="contain" style={styles.image}/>
          
          </CardItem>
           
          </Card>
          </TouchableOpacity>
        </Content>
        <Content padder>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('DeliverySignUp')}>
          <Card style={styles.cards}>
            <CardItem cardBody style={styles.carditems}>
          <Image source={require('../pics/Delivery.jpg')} resizeMode="contain" style={styles.image}/>
          
          </CardItem>
           
          </Card>
        </TouchableOpacity>
        </Content>
      </Container>
      );
    }
  }
const styles=StyleSheet.create({
 cards:{
  flex:1,
  alignItems:"center",
  justifyContent:"center",
 },
 text:{
   position:"absolute",
   color:"purple",
   fontSize:30,
   zIndex:1
 },
 image:{
  flexWrap: 'wrap',
  height: 200, 
  width: null,
  flex: 1,
  
  borderWidth: 0.8,
    borderColor: '#d6d7da',
 },
 carditems:{
  alignItems:"center",
  justifyContent:"center"
 }
})