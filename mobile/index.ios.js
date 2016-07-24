import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  DeviceEventEmitter
} from 'react-native'

import firebase from 'firebase'
import { RNLocation as Location } from 'NativeModules'

// Initialize Firebase
const firebaseConfig = {
  apiKey: "Ma2GyFgiUmpueLu4n2ge4Ut7zchkfO4NDlbTgZMN",
  authDomain: "gpstracker-60a24.firebaseapp.com",
  databaseURL: "https://gpstracker-60a24.firebaseio.com/",
  storageBucket: "gs://gpstracker-60a24.appspot.com"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)


class Eyeinthesky extends Component {
  constructor() {
    super()
    this.state = {
      location: {}
    }
    this.locationsRef = this.getRef().child('locations')
  }
  getRef() {
    return firebaseApp.database().ref()
  }
  componentWillMount() {
    Location.requestAlwaysAuthorization()
    Location.startUpdatingLocation()
    Location.setDistanceFilter(5.0)
    DeviceEventEmitter.addListener('locationUpdated', (location) => {
      console.log(location)
      this.setState({ location })
      this.locationsRef.push({ location })
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./logo2.png')} />
        <Text style={styles.welcome}>
          Welcome
        </Text>
        <Text style={styles.json}>
          {JSON.stringify(this.state.location)}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3DCAA3',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  json: {
    fontSize: 12,
    fontFamily: 'Courier',
    textAlign: 'center',
    fontWeight:'bold'
  }
})

AppRegistry.registerComponent('eyeinthesky', () => Eyeinthesky)
