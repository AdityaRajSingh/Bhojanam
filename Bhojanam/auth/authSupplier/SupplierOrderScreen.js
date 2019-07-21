import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet,View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native-elements';
import { ListItem } from 'native-base';
var jwt,id;
export default class SupplierOrderScreen extends Component {
    static navigationOptions = ({title: "Your Order History"})

    state={
        orders:[]
    }
    componentDidMount=async()=>{
        jwt=await AsyncStorage.getItem('jwts');
        id= await AsyncStorage.getItem('ids');
        await console.log(id,jwt);
        await fetch('https://bhojanam-backend.herokuapp.com/orders/supplier/'+id,{
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
 <View style={{flex:1,flexDirection:"row"}}><Text style={styles.eventMonth}>Number of persons fed: </Text><Text style={styles.eventDay}>{item.noOfPerson}</Text></View>
{item.delivery&&<View style={{flex:1,flexDirection:"row"}}><Text style={styles.eventMonth}>Delivered by: </Text><Text style={styles.eventDay}>{item.delivery.name}</Text></View>}    
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