import React, { Component } from 'react'
import {View,Text,Image,TouchableHighlight,StyleSheet, Modal, TouchableOpacity} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationActions,StackActions } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem, Container } from 'native-base';
var jwt,id;
export default class DeliveryProfileScreen extends Component {
    static navigationOptions = ({title: "Your Profile",headerLeft: null})
    state = {
      photo:null,
        name:"",
        mobile:"",
        password:"",
        address:"",
        orders:[],
        item:{supplier:{address:"",name:"",mobile:""},time:"",_id:"",noOfPerson:1},
        modalVisible:false
      };
      componentDidMount=async()=>{
        jwt=await AsyncStorage.getItem('jwtd');
        id= await AsyncStorage.getItem('idd');
        await console.log(id,jwt);
        await fetch('https://bhojanam-backend.herokuapp.com/orders/',{
          method:"GET",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization':"bearer "+jwt
          }
        }).then((res=>{
          return res.json();
        }))
        .then((res)=>{
          console.log(res);
           var newRes= res.filter((item)=>{return !item.delivery})
            console.log(newRes);
           return newRes;
        })
        .then((newRes)=>{
          fetch('https://bhojanam-backend.herokuapp.com/delivery/'+id,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization':'bearer '+jwt
          }
        }).then((res)=>{
          console.log(res);
          return res.json();
          })
          .then((result)=>{
            console.log(result.address);
            console.log(this);
            this.setState({
            orders:newRes,
            name:result.name,
          mobile:result.mobile,
          password:result.password,
          address:result.address,
          photo:result.photo
          })
          })
          .catch((error)=>{console.log(error);alert("Error retreiving data")})
        })
        .catch((err)=>{console.log(err);alert("Sorry! Something went wrong.")})
      }
      home=()=>{
        AsyncStorage.removeItem('jwtd');
        AsyncStorage.removeItem('idd');
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Home'})
          ]
        })
        this.props.navigation.dispatch(resetAction)
      }
      setModalVisible=(val)=>{
          this.setState({modalVisible:val})
      }
      displayModal=(item)=>{
        this.setState({item:item});
        this.setModalVisible(true);
      }
      hideModal=()=>{
        this.setState({item:{supplier:{address:"",name:"",mobile:""},time:"",_id:"",noOfPerson:1}});
      }
      placeOrder=()=>{
        console.log(this.state.item);
        fetch('https://bhojanam-backend.herokuapp.com/orders/'+this.state.item._id,{
          method:'PUT',
          headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization':'bearer '+jwt
          },
          body:JSON.stringify({
            "deliveryID":id
          })
        }).then((res)=>{return res.json()})
        .then((res)=>{
          console.log(res);
          this.setModalVisible(false);
          const resetAction = StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'DeliveryRegistered'})
            ]
          })
          this.props.navigation.dispatch(resetAction)        
        }).catch((err)=>{console.log(err);alert("Error")})
      }
      viewOrders=()=>{
        this.props.navigation.navigate('DeliveryOrder')
      }
    render() {
        return (
            <View style={{flex:1}}>
              <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
            this.setState({item:{supplier:{address:"",name:"",mobile:""},time:"",_id:"",noOfPerson:1}})
          }}>
           <Container style={{justifyContent:"center",alignItems:"center",backgroundColor: '#ffffff'}}>
            <Image style={styles.logo} source={{uri: 'https://png.icons8.com/facebook-like/nolan/120/3498db'}}/>
            <Text style={{fontSize:30,}}>Name: {this.state.item.supplier.name}</Text>
              <Text style={{fontSize:20,}}>Address: {this.state.item.supplier.address}</Text>
              <Text style={{fontSize:20,}}>Mobile: {this.state.item.supplier.mobile}</Text>
              {this.state.item.time&&<Text>Time: {this.state.item.time}</Text>}
              <TouchableHighlight style={[styles.buttonContainer, styles.sendButton]} onPress={this.placeOrder}>
            <Text style={styles.buttonText}>Accept Order</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.buttonContainer, styles.sendButton]} onPress={()=>{this.hideModal;this.setModalVisible(false);}}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableHighlight>
            </Container>
        </Modal>
        <View style={styles.header}>
          <View style={styles.headerContent}>
              <Image style={styles.avatar}
                source={{uri: this.state.photo}}/>
              <Text style={styles.name}>
              {this.state.name}
              </Text>
            </View>
          </View>
                <View style={styles.scroll}>
                  <Text>Pending Orders:</Text>
                  <ScrollView style={styles.eventList}>
                  {this.state.orders.map(
                    (item,idx)=>{
                      return <ListItem onPress={()=>{this.displayModal(item)}} style={styles.scrollItem} key={idx}>
                        <View style={styles.eventContent}>
       <View style={{flex:1,flexDirection:"row"}}><Text style={styles.eventMonth}>Time: </Text><Text style={styles.eventDay}>{item.time}</Text></View>
       <View style={{flex:1,flexDirection:"row"}}><Text style={styles.eventMonth}>Address: </Text><Text style={styles.eventDay}>{item.supplier.address}</Text></View>
                </View>
                      </ListItem>
                    }
                  )}
                  </ScrollView>
                </View>
           <View style={{flex:1,flexDirection:"row",backgroundColor:"#d3d3d3",alignItems:"center",justifyContent:"center"}}>
              <TouchableOpacity style={styles.buttonContainer} onPress={this.viewOrders}>
                <Text>View Orders</Text> 
              </TouchableOpacity>     
              <View style={{flex:1}}/> 
              <TouchableOpacity style={styles.buttonContainer} onPress={this.home}>
                <Text>Logout</Text> 
              </TouchableOpacity>       
            </View>
          </View>
        )
    }
}
const styles=StyleSheet.create({
  logo:{
    width:120,
    height:120,
    justifyContent:"center",
    marginBottom:10,
    marginTop:30
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:200,
    marginLeft:10,
    marginRight:10,
    borderRadius:30,
    backgroundColor: "#FC8019",
  },
  image:{
    height:80,
    width:80,
    marginTop:20,
    marginBottom:20,
    borderRadius: 40,
    borderWidth: 1
  },
  bolded:{
    fontWeight:"bold"
  },
  text:{
    flex:1,
    fontSize:30
  },
  scroll:{
    backgroundColor:"#d3d3d3",
    flex:3
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
  header:{
    flex:2,
  backgroundColor: "#FC8019",
},
headerContent:{
  padding:30,
  alignItems: 'center',
},
avatar: {
  width: 130,
  height: 130,
  borderRadius: 63,
  borderWidth: 4,
  borderColor: "white",
  marginBottom:10,
},
name:{
  fontSize:22,
  color:"#FFFFFF",
  fontWeight:'600',
},
sendButton: {
  backgroundColor: "#ffffff",
},
buttonText: {
  fontSize:15,
  color: '#EE82EE',
}
})
