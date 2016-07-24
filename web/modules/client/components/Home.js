import React from 'react'
import './Home.css'

console.log(mapboxgl)

class Home extends React.Component {
  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiamNtdXNlIiwiYSI6ImVqMmlmeTQifQ.Z4cdYoe1Htq-9aEd5Qnjsw';
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
        center: [-74.50, 40], // starting position
        zoom: 9 // starting zoom
    });
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
