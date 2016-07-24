/* global mapboxgl */
const firebaseConfig  = {
    apiKey: "Ma2GyFgiUmpueLu4n2ge4Ut7zchkfO4NDlbTgZMN",
    authDomain: "gpstracker-60a24.firebaseapp.com",
    databaseURL: "https://gpstracker-60a24.firebaseio.com/",
    storageBucket: "gs://gpstracker-60a24.appspot.com"
  }
import React from 'react'
import './Home.css'
import firebase from 'firebase'
import { has } from 'lodash'

const firebaseApp = firebase.initializeApp(firebaseConfig)

class Home extends React.Component {
  constructor() {
    super()
    this.locationsRef = this.getRef().child('locations')
    this.listenForItems = this.listenForItems.bind(this)
    this.state = {
      point: {
        type: 'Point',
        coordinates: [ -82.56827, 27.70834 ],
        properties: {
          default: true
        }
      }
    }
  }
  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiamNtdXNlIiwiYSI6ImVqMmlmeTQifQ.Z4cdYoe1Htq-9aEd5Qnjsw'
    this.map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
        center: this.state.point.coordinates, // starting position
        zoom: 9 // starting zoom
    })
    this.source = new mapboxgl.GeoJSONSource({
        data: this.state.point
    })
    this.map.on('load', () => {
      this.map.addSource('point', this.source)
      this.map.addLayer({
        id: 'point',
        source: 'point',
        type: 'circle',
        paint: {
          "circle-radius": 10,
          "circle-color": '#2069A9'
        }
      })
    })
  }
  getRef() {
    return firebaseApp.database().ref()
  }
  componentWillMount() {
    this.listenForItems(this.locationsRef)
  }
  componentDidUpdate(prevProps, prevState) {
    this.source.setData(this.state.point)
    if (has(prevState, 'point.properties.default') && prevState.point.properties.default === true) {
      this.map.easeTo({
        center: this.state.point.coordinates,
        zoom: 15
      })
    }
  }
  listenForItems(locationsRef) {
    locationsRef.limitToLast(1).on("child_added", snapshot => {
      this.setState({
        point: {
          type: 'Point',
          coordinates: [
            snapshot.val().location.coords.longitude,
            snapshot.val().location.coords.latitude
          ]
        }
      })
    })
  }
  render() {
    return (
      <div>
        <div id="map" />
      </div>
    )
  }
}

export default Home
