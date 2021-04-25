# React Leaflet GARS Graticule

This graticule displays Global Area Reference System (GARS) cells on a Leaflet map. See this [website](https://en.wikipedia.org/wiki/Global_Area_Reference_System) for more details about what GARS is.

See known issues [HERE](https://github.com/dnlbaldwin/React-Leaflet-GARS-Graticule/issues)

See the live demo [HERE](https://dnlbaldwin.github.io/React-Leaflet-GARS-Graticule/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

This library uses React-Leaflet-V3. It is not tested with React-Leaflet-V2.

### Installing

To install all dependencies run the following command:

```
npm install
```

To run the example on your desktop, navigate to the example directory and run:

```
npm start
```

## Running the tests

No unit tests at this time.

## Usage

```js
import { LayerGroup, LayersControl, MapContainer, TileLayer } from 'react-leaflet';
import './App.css';

import { GarsGraticule } from 'react-leaflet-gars-graticule';
function App() {
  return (
    <MapContainer
      center={[45.4, -75.7]}
      zoom={8}
      minZoom={3}
      maxZoom={16}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="ESRI Satellite">
          <TileLayer
            url="https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='&copy; <a href="https://wiki.openstreetmap.org/wiki/Esri"></a> contributors'
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="ESRI Clarity">
          <TileLayer
            url="https://clarity.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='&copy; <a href="https://wiki.openstreetmap.org/wiki/Esri"></a> contributors'
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="OSM Topo">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="OSM Topo">
          <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" attribution="OSM" />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay checked name="GARS graticule">
          <LayerGroup>
            <GarsGraticule />
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
      <GarsGraticule />
    </MapContainer>
  );
}

export default App;
```

## Roadmap

- Make graticule colours configurable
- Make label visibility configurable
- Investigate adding labels for high zoom levels, and refactoring how labels are displayed for low zoom levels

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
