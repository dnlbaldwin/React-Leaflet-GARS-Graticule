# React Leaflet MGRS Graticule

This graticule displays Global Area Reference System (GARS) cells on a Leaflet map. See this [website](https://earth-info.nga.mil/GandG/coordsys/grids/gars.html) for more details about what GARS is.

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
```

## Roadmap

- Make graticule colours configurable
- Make label visibility configurable
- Add labels for higher resolutions

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
