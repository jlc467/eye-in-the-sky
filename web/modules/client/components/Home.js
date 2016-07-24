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
    this.listenForItems = this.listenForItems.bind(this)
    this.state ={
      point: {"geometry": {"type": "Point", "coordinates": [-25.142123957711451, 47.190549346200321]}, "type": "Feature", "properties": {}}
    }
  }
  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiamNtdXNlIiwiYSI6ImVqMmlmeTQifQ.Z4cdYoe1Htq-9aEd5Qnjsw';
    this.map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
        center: [-74.50, 40], // starting position
        zoom: 9 // starting zoom
    });
    this.source = new mapboxgl.GeoJSONSource({
        data: this.state.point
    });

    this.map.on('load', () => {
        // Add a source and layer displaying a point which will be animated in a circle.


        // window.setInterval(() => {
        //     console.log(this.state.point, 'point')
        // }, 2000);

        this.map.addSource('point', this.source);

        this.map.addLayer({
            "id": "point",
            "source": "point",
            "type": "circle",
            "paint": {
                "circle-radius": 10,
                "circle-color": "#007cbf"
            }
        });
    });
  }
  getRef() {
    return firebaseApp.database().ref()
  }
  componentWillMount() {
    this.listenForItems(this.locationsRef)
  }
  componentDidUpdate(prevProps, prevState) {
    this.source.setData(this.state.point);
  }
  listenForItems(locationsRef) {
    locationsRef.limitToLast(1).on("child_added", snapshot => {
      console.log(snapshot.val().location.coords.latitude)
      this.setState({
        point: {
            "type": "Point",
            "coordinates": [
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
Hii!!!!
      <div id="map" />

      </div>
    )
  }
}

export default Home
