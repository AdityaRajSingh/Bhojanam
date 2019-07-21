import React, { Component } from 'react';
import {View,Image,Modal,StyleSheet,TouchableOpacity} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import PureChart from 'react-native-pure-chart';
import { NavigationActions,StackActions } from 'react-navigation';
import { Button,Input } from 'react-native-elements';
import {Container,Form,Content,Item,Text,Fab,Icon} from 'native-base';
var jwt,id;
  export default class SupplierProfileScreen extends Component {
    static navigationOptions = ({title: "Your Profile",headerLeft: null})
    state = {
        photo:null,
        modalVisible: false,
        name:"",
        active:false,
        email:"",
        mobile:"",
        password:"",
        address:"",
        noOfperson:"",
        time: "",
        streak:"",
        needyData:100,
        orderData:100
      };
    componentDidMount=async()=>{
        jwt=await AsyncStorage.getItem('jwts');
         id= await AsyncStorage.getItem('ids');
      await console.log(id,jwt);
      await fetch('https://bhojanam-backend.herokuapp.com/orders/count',{
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
      }).then((res)=>{return res.json()})
      .then((res)=>{console.log(res);this.setState({orderData:res})})
      .catch((err)=>{console.log(err)})
      await fetch('https://bhojanam-backend.herokuapp.com/needyPersons/count',{
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
      }).then((res)=>{return res.json()})
      .then((res)=>{console.log(res);this.setState({needyData:res})})
      .catch((err)=>{console.log(err)})
      await fetch('https://bhojanam-backend.herokuapp.com/suppliers/'+id,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization':'bearer '+jwt
        },
      }).then((res)=>{
        console.log(res);
        return res.json();
        })
        .then((result)=>{
          console.log(result);
          this.setState({
          name:result.name,
        email:result.email,
        mobile:result.mobile,
        password:result.password,
        photo:result.photo,
        address:result.address,
        streak:result.streak
        })
        })
        .catch((error)=>{console.log(error);alert("Error retreiving data")})
    }
      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }
      home=()=>{
        AsyncStorage.removeItem('jwts');
        AsyncStorage.removeItem('ids');
        console.log(AsyncStorage.getItem('jwts'))
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Home'})
          ]
        })
        this.props.navigation.dispatch(resetAction)
      }
      donated=async()=>{
        fetch('https://bhojanam-backend.herokuapp.com/orders',{
          method:"POST",
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':"bearer "+jwt
          },
          body:JSON.stringify({
            "supplier":id,
            "noOfPerson":parseInt(this.state.noOfperson),
            "time":this.state.time
          })
        }).then((res)=>{
          console.log(res);
          this.setModalVisible(false);
          const resetAction = StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'SupplierRegistered'})
            ]
          })
          this.props.navigation.dispatch(resetAction)
        })
        .catch((error)=>{console.log(error);alert(error);})
      }
      viewOrders=()=>{
        this.props.navigation.navigate('SupplierOrder')
      }
    render() {
        const perc=(this.state.needyData!==0)?((this.state.orderData/this.state.needyData)*100):100;
        console.log(perc);
      return (
        <View style={styles.container}>
        <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          alert('You haven\'t donated anything!');
          this.setModalVisible(false);
        }}>
        <Container style={{justifyContent:"center",alignItems:"center",backgroundColor: '#ffffff',paddingTop:300}}>
      <Content>
        <Form>
          <Item>
          <Image style={styles.inputIcon} source={require('./clock.png')}/>
            <Input placeholder="time" style={styles.inputs} value={this.state.time} onChangeText={(val)=>{this.setState({time:val})}}/>
          </Item>
          <Item>
          <Image style={styles.inputIcon} source={require('./people.png')}/>
            <Input placeholder="Number of Persons" style={styles.inputs} keyboardType="number-pad" value={this.state.noOfperson} onChangeText={(val)=>{this.setState({noOfperson:val})}}/>
          </Item>
          </Form>
          <Button buttonStyle={{backgroundColor:"#FC8019",marginTop:10,width:'50%',alignSelf:"center",borderRadius:20,marginTop:50}} title="Donate" onPress={this.donated}/>
      </Content>
    </Container>
      </Modal>
        <View style={styles.header}>
          <View style={styles.headerContent}>
              <Image style={styles.avatar}
                source={{uri: this.state.photo}}/>

              <Text style={styles.name}>
              {this.state.name}
              </Text>
              <View style={{marginTop:10,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
              <Icon name="star-half" style={{color:"white",marginRight:10}}/>
              <Text style={{color:"white",fontSize:20}}>{this.state.streak}</Text>
              </View>
              <Fab
          active={this.state.active}
          direction="up"
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}>
          <Icon name="share" />
          <Button style={{ backgroundColor: '#34A34F' }}>
            <Icon name="logo-whatsapp" />
          </Button>
          <Button style={{ backgroundColor: '#3B5998' }}>
            <Icon name="logo-facebook" />
          </Button>
          <Button disabled style={{ backgroundColor: '#DD5144' }}>
            <Icon name="mail" />
          </Button>
        </Fab>
          </View>
        </View>
        <View style={styles.bottom}>
        <PureChart data={[{data:[100],color:"blue",label:"Food Received"},{data:[perc],color:"red",label:"Total Needy People"}]} type='bar' height={150} width={"80%"} />   
        <Text>Total number of needy persons: {this.state.needyData}</Text>
        <Text>Food acquired for needy persons: {this.state.orderData}</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={()=>{this.setModalVisible(true)}}>
                <Text>Donate Food</Text>  
              </TouchableOpacity>              
              <TouchableOpacity style={styles.buttonContainer} onPress={()=>{this.props.navigation.navigate('Pay')}}>
                <Text>Donate Funds</Text> 
              </TouchableOpacity>
              <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
              <TouchableOpacity style={styles.newButtonContainer} onPress={this.viewOrders}>
                <Text>View Orders</Text> 
              </TouchableOpacity>   
              <View style={{flex:1}}/>   
              <TouchableOpacity style={styles.newButtonContainer} onPress={this.home}>
                <Text>Logout</Text> 
              </TouchableOpacity>       
            </View>
        </View>
    </View>
      );
    }
  }
  const styles = StyleSheet.create({
   
    bottom:{
        flex:4,
        alignItems:"center",
        justifyContent:"center"
    },
    donate:{
        marginTop:20,
        width:"50%"
    },
  header:{
      flex:3,
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
  textInfo:{
    fontSize:18,
    marginTop:20,
    color: "#696969",
  },
  container:{
      flex:1
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
},
inputIcon:{
  width:30,
  height:30,
  marginLeft:15,
  justifyContent: 'center'
},
loginButton:{
    marginTop:20,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00b5ec",
},
buttonContainer: {
  marginTop:5,
  height:30,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom:5,
  width:250,
  borderRadius:30,
  backgroundColor: "#FC8019",
},
newButtonContainer:{
  flex:1,
  height:30,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width:null,
  marginLeft:10,
  marginRight:10,
  borderRadius:20,
  backgroundColor: "#FC8019",
}
});