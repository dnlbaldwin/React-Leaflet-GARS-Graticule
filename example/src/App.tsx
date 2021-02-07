import { MapConsumer, MapContainer, TileLayer } from 'react-leaflet';
import './App.css';

import { GarsGraticule } from 'react-leaflet-gars-graticule';
function App() {
  return (
    <MapContainer
      center={[45.4, -75.7]}
      zoom={11}
      minZoom={3}
      maxZoom={16}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
    >
      <TileLayer
        // OSM
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        // ESRI Clarity Sat
        // url="https://clarity.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        // ESRI Sat
        url="https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution='&copy; <a href="https://wiki.openstreetmap.org/wiki/Esri"></a> contributors'
      />
      <MapConsumer>
        {(map) => {
          GarsGraticule(map);
          return null;
        }}
      </MapConsumer>
    </MapContainer>
  );
}

export default App;
