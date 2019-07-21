import React from 'react';
import {Button} from 'react-native-elements'
import  {
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Text
} from 'react-native'
import { NavigationActions,StackActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
const t = require('tcomb-form-native')

const Form = t.form.Form

const User = t.struct({
  mobile: t.String,
  password:  t.String
})

const options = {
  fields: {
    mobile: {
      autoCapitalize: 'none',
      autoCorrect: false
    },
    password: {
      autoCapitalize: 'none',
      password: true,
      secureTextEntry:true,
      autoCorrect: false
    }
  }
}

export default class DeliverySignInScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Sign in"
    };
  };
  constructor(props) {
    super(props)
    this.state = {
      value: {
        mobile: '',
        password: ''
      }
    }
  }

  componentWillUnmount() {
    this.setState = {
      value: {
        mobile: '',
        password: null
      }
    }
  }

  _onChange = (value) => {
    this.setState({
      value
    })
  }
  _handleAdd = () => {
    const value = this.refs.form.getValue();
    // If the form is valid...
    if (value) {
      const data = {
        "mobile": value.mobile,
        "password": value.password
      }
      // Serialize and post the data
      const json = JSON.stringify(data)
      console.log(json);
      fetch('https://bhojanam-backend.herokuapp.com/delivery/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      })
      .then((response) => {
        
     return response.json()})
      .then((res) => {
        if (res.error) {
          alert(res.error)
        } else {
          console.log(res);
          AsyncStorage.setItem('jwtd', res.token);
          AsyncStorage.setItem('idd',res.deliveryID);
          const resetAction = StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'DeliveryProfile'})
            ]
          })
          this.props.navigation.dispatch(resetAction)
        }
      })
      .catch(() => {
        alert('There was an error logging in.');
      })
      .done()
    } else {
      // Form validation error
      alert('Please fix the errors listed and try again.')
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Form
          ref='form'
          options={options}
          type={User}
          value={this.state.value}
          onChange={this._onChange}
        />
       <Button buttonStyle={{backgroundColor:"#FC8019",marginTop:10,width:'50%',alignSelf:"center",borderRadius:20}} title="Log in" onPress={this._handleAdd}/>
      </ScrollView>
    )
  }
};

var styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: 'column'
  },
  button: {
    borderRadius: 4,
    padding: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff'
  },
  greenButton: {
    backgroundColor: '#FC8019'
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})