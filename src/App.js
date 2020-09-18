import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React, { useState, useRef, useCallback } from 'react'
import { render } from 'react-dom'
import MapGL from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'

const MAPBOX_TOKEN = 'pk.eyJ1Ijoic21peWFrYXdhIiwiYSI6ImNqcGM0d3U4bTB6dWwzcW04ZHRsbHl0ZWoifQ.X9cvdajtPbs9JDMG-CMDsA'
 
//Netherlands country coordinates
const App = () => {
  const [viewport, setViewport] = useState({
    latitude: 52.2129919,
    longitude: 5.2793703,
    zoom: 4
  })
  const geocoderContainerRef = useRef()
  const mapRef = useRef()
  const handleViewportChange = useCallback((newViewport) => setViewport(newViewport), [])

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 }

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      })
    },
    [handleViewportChange]
  )

  return (
    <div style={{ height: '40vh', width: '600px' }}>
      <div ref={geocoderContainerRef} style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }} />
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}>
        <Geocoder
          mapRef={mapRef}
          containerRef={geocoderContainerRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-left"
        />
      </MapGL>
    </div>
  )
}

render(<App />, document.getElementById('root'))

export default App