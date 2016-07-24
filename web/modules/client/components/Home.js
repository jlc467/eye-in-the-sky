const { firebaseConfig } = require( '../../../../config.js')
import React from 'react'
import './Home.css'
import firebase from 'firebase'

// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig)


console.log(mapboxgl)

class Home extends React.Component {
  constructor() {
    super()
    this.locationsRef = this.getRef().child('locations')
  }
  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiamNtdXNlIiwiYSI6ImVqMmlmeTQifQ.Z4cdYoe1Htq-9aEd5Qnjsw';
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
        center: [-74.50, 40], // starting position
        zoom: 9 // starting zoom
    });
  getRef() {
    return firebaseApp.database().ref()
  }
  componentWillMount() {
    this.listenForItems(this.locationsRef)
  }
  listenForItems(locationsRef) {
    locationsRef.limitToLast(50).on("child_added", snapshot => {
      console.log(snapshot.val())
    })
  }
  render() {
    return (
      <div>
Hii!!!!
      <div id="map" />

      </div>
    )
  }
}

export default Home
