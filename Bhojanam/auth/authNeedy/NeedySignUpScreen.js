import React from "react";
import { Button } from 'react-native-elements';
import {Container,Form,Content,Label,Item,Text,Radio,Left,Right,ListItem, Input} from 'native-base';
export default class NeedySignUpScreen extends React.Component{
  state={
    name:"",
    aadhar:"",
    time:0,
    persons:"1"
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Sign Up"
    };
  };
  pressed=()=>{
  const {name,aadhar,time,persons}=this.state
  console.log(this.state);
  var data=JSON.stringify({
    "name":name,
    "aadhar":aadhar,
    "time":time,
    "noOfPerson":persons
  })
  console.log(data);
    fetch('https://bhojanam-backend.herokuapp.com/needyPersons',{
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:data
    }).then((res)=>{console.log(res);this.props.navigation.navigate('NeedyRegistered');})
    .catch((error)=>{console.log(error)})
  }
  change=(val)=>{
    this.setState({time:val})
  }
  render(){
    return(
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input value={this.state.name} onChangeText={(val)=>{this.setState({name:val})}}/>
            </Item>
            <Item floatingLabel>
              <Label>Aadhar</Label>
              <Input value={this.state.aadhar} onChangeText={(val)=>{this.setState({aadhar:val})}}/>
            </Item>
            <Item floatingLabel>
              <Label>Number of Persons</Label>
              <Input keyboardType="number-pad" value={this.state.persons} onChangeText={(val)=>{this.setState({persons:parseInt(val)})}}/>
            </Item>
           <ListItem onPress={()=>{this.change(0)}}>
             <Left>
               <Text>Day</Text>
             </Left>
             <Right><Radio
             color={"#007800"}
             selectedColor={"#FC8019"}
             selected={this.state.time==0}
             /></Right>
           </ListItem>
           <ListItem onPress={()=>{this.change(1)}}>
             <Left>
               <Text>Night</Text>
             </Left>
             <Right><Radio
             color={"#007800"}
             selectedColor={"#FC8019"}
             selected={this.state.time==1}
             /></Right>
           </ListItem>
           <ListItem onPress={()=>{this.change(2)}}>
             <Left>
               <Text>Both</Text>
             </Left>
             <Right><Radio
             color={"#007800"}
             selectedColor={"#FC8019"}
             selected={this.state.time==2}
             /></Right>
           </ListItem>
            </Form>
            <Button buttonStyle={{backgroundColor:"#FC8019",marginTop:20,width:'50%',alignSelf:"center",borderRadius:20}} title="Sign Up" onPress={this.pressed}/>
        </Content>
      </Container>
    )
  }
}
