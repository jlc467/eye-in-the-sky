const { firebaseConfig } = require( '../../../../config.js')
import React from 'react'
import './Home.css'
import firebase from 'firebase'

// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig)


class Home extends React.Component {
  constructor() {
    super()
    this.locationsRef = this.getRef().child('locations')
  }
  getRef() {
    return firebaseApp.database().ref()
  }
  componentWillMount() {
    this.listenForItems(this.locationsRef)
  }
  listenForItems(locationsRef) {
    locationsRef.on('child_added', (childSnapshot, prevChildKey) => {
      console.log(childSnapshot.val())
    })
  }
  render() {
    return (
      <div>go!</div>
    )
  }
}

export default Home
