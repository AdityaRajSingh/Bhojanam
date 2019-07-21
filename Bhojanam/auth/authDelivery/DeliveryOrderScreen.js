import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet,View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native-elements';
import { ListItem } from 'native-base';
var jwt,id;
export default class DeliveryOrderScreen extends Component {
  static navigationOptions = ({title: "Your Orders"})

    state={
        orders:[]
    }
    componentDidMount=async()=>{
        jwt=await AsyncStorage.getItem('jwtd');
        id= await AsyncStorage.getItem('idd');
        await console.log(id,jwt);
        await fetch('https://bhojanam-backend.herokuapp.com/orders/delivery/'+id,{
          method:"GET",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization':'bearer '+jwt
          }
        }).then((res=>{
          return res.json();
        }))
        .then((res)=>{
          console.log(res);
            this.setState({orders:res});
        }).catch((err)=>{console.log(err);alert("Error");})
    }
    render() {
        return (
            <View style={styles.scroll}>
            <ScrollView style={styles.eventList}>
            {this.state.orders.map(
              (item,idx)=>{
                return <ListItem key={idx}>
                  <View style={styles.eventContent}>
 <View style={{flex:1,flexDirection:"row"}}><Text style={styles.eventMonth}>Time: </Text><Text style={styles.eventDay}>{item.time}</Text></View>
 <View style={{flex:1,flexDirection:"row"}}><Text style={styles.eventMonth}>Address: </Text><Text style={styles.eventDay}>{item.supplier.address}</Text></View>
          </View>
                </ListItem>
              }
            )}
            </ScrollView>
          </View>
        )
    }
}
const styles=StyleSheet.create({
    scroll:{
        backgroundColor:"#d3d3d3",
        flex:1
      },
      eventList:{
        marginTop:20,
      },
      eventBox: {
        padding:10,
        marginTop:5,
        marginBottom:5,
        flexDirection: 'row',
      },
      eventDay:{
        fontSize:20,
        color: "black",
      },
      eventDate:{
        flexDirection: 'column',
      },
      eventMonth:{
        fontSize:20,
        color: "black",
        fontWeight: "600",
      },
      eventContent: {
        flex:1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft:10,
        backgroundColor: '#FFFFFF',
        padding:10,
        borderRadius:10
      },
})