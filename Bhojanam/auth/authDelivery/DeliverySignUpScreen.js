import React from "react";
import { Button } from 'react-native-elements';
import {Container,Form,Content,Label,Item,Text,Input} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import {Image,Platform} from 'react-native';
export default class SignUpScreen extends React.Component{
  state={
    name:"",
    email:"",
    password:"",
    mobile:"",
    address:"",
    photo:null
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Sign Up"
    };
  };
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response })
      }
    })
  }
  handleUploadPhoto = () => {
    const {name,email,password,mobile,address}=this.state;
    console.log(name,email,password,address,mobile);
    fetch("https://bhojanam-backend.herokuapp.com/delivery", {
      method: "POST",
      body: createFormData(this.state.photo,{
     "name":name,
    "password":password,
    "mobile":mobile,
    "address":address
      })
    })
      .then(response => { 
        console.log("upload success", response);
      alert("Upload success!");
      this.setState({ photo: null });
      this.props.navigation.navigate('DeliverySignIn');
    })
      .catch(error => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
  };
  pressed=()=>{
  const {name,email,password,mobile,address}=this.state
  var data=JSON.stringify({
    "name":name,
    "password":password,
    "mobile":mobile,
    "address":address
  })
  console.log(data);
    fetch('https://bhojanam-backend.herokuapp.com/delivery',{
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:data
    }).then((res)=>{
      console.log(res);
      this.props.navigation.navigate('DeliverySignIn');
    })
    .catch((error)=>{console.log(error)})
  }
  render(){
    const {photo}=this.state;
    return(
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input value={this.state.name} onChangeText={(val)=>{this.setState({name:val})}}/>
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input value={this.state.password} secureTextEntry={true} onChangeText={(val)=>{this.setState({password:val})}}/>
            </Item>
            <Item floatingLabel>
              <Label>Mobile</Label>
              <Input keyboardType="number-pad" value={this.state.mobile} onChangeText={(val)=>{this.setState({mobile:val})}}/>
            </Item>
            <Item floatingLabel>
              <Label>Address</Label>
              <Input value={this.state.address} onChangeText={(val)=>{this.setState({address:val})}}/>
            </Item>
            </Form>
            {photo && (
          <React.Fragment>
            <Image
              source={{ uri: photo.uri }}
              style={{ width: 300, height: 300 }}
            />
            <Button buttonStyle={{backgroundColor:"#FC8019",marginTop:20,width:'50%',alignSelf:"center",borderRadius:20}} title="Sign Up" onPress={this.handleUploadPhoto}/>
          </React.Fragment>
        )}
        <Button title="Choose Photo" buttonStyle={{backgroundColor:"#FC8019",marginTop:20,width:'50%',alignSelf:"center",borderRadius:20}} onPress={this.handleChoosePhoto} />
            <Text style={{alignSelf:"center",marginTop:20}}>Already a member? </Text>
            <Button buttonStyle={{backgroundColor:"#FC8019",marginTop:10,width:'50%',alignSelf:"center",borderRadius:20}} title="Sign in" onPress={()=>this.props.navigation.navigate('DeliverySignIn')}/>
        </Content>
      </Container>
    )
  }
}
const createFormData = (photo, body) => {
  console.log('Form');
  const data = new FormData();

  data.append("photo", {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
    console.log(data);
  });

  return data;
};