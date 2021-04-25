import { LatLng, Map, Point } from 'leaflet';
import { useMap } from 'react-leaflet';
import { getGARSLetters, getGARSNumbers } from './utilities';

const GarsGraticule = () => {
  let map = useMap();
  console.log(map);
  let g = new Graticule(map);

  return null;
};

/**
 * In GARS there are three precision levels, Thirty, fifteen, and five minute intervals
 */
enum Interval {
  Thirty,
  Fifteen,
  Five,
}

/**
 * The properties of the graticule when it's being drawn
 */
type GraticuleProperties = {
  interval: Interval;
  increment: number;
  minZoom: number;
  lineWidth: number;
  lineColor: string;
};

/**
 * This class compartmentalizes the functionality required to draw GARS graticules
 */
class Graticule {
  readonly _HALF_DEGREE: number = 0.5; // 30 minutes
  readonly _QUARTER_DEGREE: number = 0.25; // 15 minutes
  readonly _ONE_TWELFTH_DEGREE: number = this._QUARTER_DEGREE / 3; // 5 Minutes
  map: Map;
  canvas: HTMLCanvasElement;

  showGrid: boolean = true;

  _THIRTY_MINUTES_MIN_ZOOM: number = 8;
  _FIFTEEN_MINUTES_MIN_ZOOM: number = 11;
  _FIVE_MINUTES_MIN_ZOOM: number = 12;

  _THIRTY_MINUTES_LINE_WIDTH: number = 3;
  _FIFTEEN_MINUTES_LINE_WIDTH: number = 2;
  _FIVE_MINUTES_LINE_WIDTH: number = 1;

  _THIRTY_MINUTES_LINE_COLOR: string = '#F79800';
  _FIFTEEN_MINUTES_LINE_COLOR: string = '#2C6FB6';
  _FIVE_MINUTES_LINE_COLOR: string = '#FFF';

  _FONT: string = '16px Courier New';
  _FONT_COLOUR: string = '#000';

  constructor(map: Map) {
    this.map = map;
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('leaflet-zoom-animated');

    // Add the canvas only if it hasn't already been added
    if (!this.map.getPanes().overlayPane.hasChildNodes()) {
      this.map.getPanes().overlayPane.appendChild(this.canvas);
    }

    this.map.on('viewreset', this.reset, this);
    this.map.on('move', this.reset, this);
    this.map.on('overlayadd', this.showGraticule, this);
    this.map.on('overlayremove', this.clearRect, this);

    // First load
    this.reset();
  }

  clearRect() {
    let ctx = this.canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.showGrid = false;
    }
  }

  showGraticule() {
    this.showGrid = true;
    this.reset();
  }

  reset() {
    const mapSize: Point = this.map.getSize();
    const mapLeftTop: Point = this.map.containerPointToLayerPoint([0, 0]);
    this.canvas.style['transform'] = `translate3d(${mapLeftTop.x}px,${mapLeftTop.y}px,0)`;

    this.canvas.width = mapSize.x;
    this.canvas.height = mapSize.y;

    let ctx = this.canvas.getContext('2d');

    if (ctx) {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.drawFiveMinuteGraticules(ctx);
      this.drawFifteenMinuteGraticules(ctx);
      this.drawThirtyMinuteGraticules(ctx);
      this.drawLabels(ctx);
    }
  }

  /**
   * This procedure will draw all 30 minute GARS labels on the visible map
   * @param {CanvasRenderingContext2D} ctx - The context of the canvas it is being drawn on
   */
  drawLabels(ctx: CanvasRenderingContext2D) {
    if (!this.canvas || !this.map) {
      return;
    }

    if (this.map.getZoom() < this._THIRTY_MINUTES_MIN_ZOOM) {
      return;
    }

    ctx.strokeStyle = this._THIRTY_MINUTES_LINE_COLOR;
    ctx.fillStyle = this._THIRTY_MINUTES_LINE_COLOR;
    ctx.font = this._FONT;

    // Get the visible area boundaries
    const leftTopLl: LatLng = this.map.containerPointToLatLng(<Point>{
      x: 0,
      y: 0,
    });
    const rightBottomLl: LatLng = this.map.containerPointToLatLng(<Point>{
      x: this.canvas.width,
      y: this.canvas.height,
    });

    // Round the boundary LL up/down to make the bounding box larger than the visible area

    const effectiveLeftTopLl: LatLng = <LatLng>{
      lat: Math.ceil(leftTopLl.lat / this._HALF_DEGREE) * this._HALF_DEGREE,
      lng: Math.floor(leftTopLl.lng / this._HALF_DEGREE) * this._HALF_DEGREE,
    };

    const effectiveRightBottomLl: LatLng = <LatLng>{
      lat: Math.floor(rightBottomLl.lat / this._HALF_DEGREE) * this._HALF_DEGREE,
      lng: Math.ceil(rightBottomLl.lng / this._HALF_DEGREE) * this._HALF_DEGREE,
    };

    for (let currLng = effectiveLeftTopLl.lng; currLng <= effectiveRightBottomLl.lng; currLng += this._HALF_DEGREE) {
      for (let currLat = effectiveRightBottomLl.lat; currLat <= effectiveLeftTopLl.lat; currLat += this._HALF_DEGREE) {
        const labelText: string = getGARSNumbers(currLng) + getGARSLetters(currLat);
        const labelPosnXy: Point = this.map.latLngToContainerPoint({
          lat: currLat + this._QUARTER_DEGREE,
          lng: currLng + this._QUARTER_DEGREE,
        });

        this.drawLabel(ctx, labelText, labelPosnXy);
      }
    }
  }

  /**
   * This procedure will draw an individual GARS 30 minute label
   * @param {CanvasRenderingContext2D} ctx - The context of the canvas it is being drawn on
   * @param {string} labelText - The 30 minute GARS label
   * @param {Point} labelPosnXy - The XY position of the GARS label
   */
  drawLabel(ctx: CanvasRenderingContext2D, labelText: string, labelPosnXy: Point) {
    const textWidth: number = ctx.measureText(labelText).width;
    const textHeight: number = ctx.measureText(labelText).fontBoundingBoxAscent;

    ctx.fillStyle = this._THIRTY_MINUTES_LINE_COLOR;
    // Magic numbers centre the rectangle and text in the proper area
    ctx.fillRect(labelPosnXy.x - textWidth / 2 - 1, labelPosnXy.y - textHeight + 4, textWidth + 3, textHeight + 2);

    ctx.fillStyle = this._FONT_COLOUR;
    ctx.fillText(labelText, labelPosnXy.x - textWidth / 2, labelPosnXy.y + 3);
  }

  /**
   * This is a generic procedure which takes the properties of the graticule and then draws them
   * @param {CanvasRenderingContext2D} ctx - The context of the canvas it is being drawn on
   * @param {GraticuleProperties} graticuleProperties - The properties of the graticule being drawn
   */
  drawGraticules(ctx: CanvasRenderingContext2D, graticuleProperties: GraticuleProperties) {
    if (!this.canvas || !this.map) {
      return;
    }

    if (this.map.getZoom() < graticuleProperties.minZoom) {
      return;
    }

    ctx.lineWidth = graticuleProperties.lineWidth;
    ctx.strokeStyle = graticuleProperties.lineColor;
    ctx.fillStyle = graticuleProperties.lineColor;

    const leftTopLl: LatLng = this.map.containerPointToLatLng(<Point>{
      x: 0,
      y: 0,
    });
    const rightBottomLl: LatLng = this.map.containerPointToLatLng(<Point>{
      x: this.canvas.width,
      y: this.canvas.height,
    });

    const baseStartingLatitude: number = Math.floor(rightBottomLl.lat / this._HALF_DEGREE) * this._HALF_DEGREE;

    const baseStartingLongitude: number = Math.floor(leftTopLl.lng / this._HALF_DEGREE) * this._HALF_DEGREE;

    const startingLatitude =
      graticuleProperties.interval === Interval.Fifteen
        ? baseStartingLatitude + this._QUARTER_DEGREE
        : baseStartingLatitude;

    // Horizontal Lines
    for (let i = startingLatitude; i <= leftTopLl.lat; i += graticuleProperties.increment) {
      if (!(graticuleProperties.interval === Interval.Five && Math.abs(i % this._HALF_DEGREE) < 1e-6)) {
        this.drawLatitudeLine(ctx, i, leftTopLl.lng, rightBottomLl.lng);
      }
    }

    const startingLongitude =
      graticuleProperties.interval === Interval.Fifteen
        ? baseStartingLongitude + this._QUARTER_DEGREE
        : baseStartingLongitude;

    // Vertical lines
    for (let i = startingLongitude; i <= rightBottomLl.lng; i += graticuleProperties.increment) {
      if (!(graticuleProperties.interval === Interval.Five && Math.abs(i % this._HALF_DEGREE) < 1e-6)) {
        this.drawLongitudeLine(ctx, i, leftTopLl.lat, rightBottomLl.lat);
      }
    }
  }

  /**
   * This procedure draws 30 minute graticules
   * @param {CanvasRenderingContext2D} ctx - The context of the canvas it is being drawn on
   */
  drawThirtyMinuteGraticules(ctx: CanvasRenderingContext2D) {
    const lineProperties: GraticuleProperties = {
      interval: Interval.Thirty,
      increment: this._HALF_DEGREE,
      minZoom: this._THIRTY_MINUTES_MIN_ZOOM,
      lineWidth: this._THIRTY_MINUTES_LINE_WIDTH,
      lineColor: this._THIRTY_MINUTES_LINE_COLOR,
    };

    this.drawGraticules(ctx, lineProperties);
  }

  /**
   * This procedure draws 15 minute graticules
   * @param {CanvasRenderingContext2D} ctx - The context of the canvas it is being drawn on
   */
  drawFifteenMinuteGraticules(ctx: CanvasRenderingContext2D) {
    const lineProperties: GraticuleProperties = {
      interval: Interval.Fifteen,
      increment: this._HALF_DEGREE,
      minZoom: this._FIFTEEN_MINUTES_MIN_ZOOM,
      lineWidth: this._FIFTEEN_MINUTES_LINE_WIDTH,
      lineColor: this._FIFTEEN_MINUTES_LINE_COLOR,
    };

    this.drawGraticules(ctx, lineProperties);
  }

  /**
   * This procedure draws 5 minute graticules
   * @param {CanvasRenderingContext2D} ctx - The context of the canvas it is being drawn on
   */
  drawFiveMinuteGraticules(ctx: CanvasRenderingContext2D) {
    const lineProperties: GraticuleProperties = {
      interval: Interval.Five,
      increment: this._ONE_TWELFTH_DEGREE,
      minZoom: this._FIVE_MINUTES_MIN_ZOOM,
      lineWidth: this._FIVE_MINUTES_LINE_WIDTH,
      lineColor: this._FIVE_MINUTES_LINE_COLOR,
    };

    this.drawGraticules(ctx, lineProperties);
  }

  /**
   * This procedure will draw a single Latitude line on the map
   * @param {CanvasRenderingContext2D} ctx - The context of the canvas it is being drawn on
   * @param {number} latitude - The latitude of the latitude line to be drawn
   * @param {number} westLng - The West longitude boundary of the visible area
   * @param {number} eastLng - The East longitude boundary of the visible area
   */
  drawLatitudeLine(ctx: CanvasRenderingContext2D, latitude: number, westLng: number, eastLng: number) {
    const westEnd = this.map.latLngToContainerPoint({
      lat: latitude,
      lng: westLng,
    });

    const eastEnd = this.map.latLngToContainerPoint({
      lat: latitude,
      lng: eastLng,
    });

    ctx.beginPath();
    ctx.moveTo(westEnd.x, westEnd.y);
    ctx.lineTo(eastEnd.x, eastEnd.y);
    ctx.stroke();
  }

  /**
   * This procedure will draw a single Longitude line on the map
   * @param {CanvasRenderingContext2D} ctx - The context of the canvas it is being drawn on
   * @param {number} longitude - The longitude of the longitude line to be drawn
   * @param {number} northLat - The North latitude boundary of the visible area
   * @param {number} southLat - The South latitude boundary of the visible area
   */
  drawLongitudeLine(ctx: CanvasRenderingContext2D, longitude: number, northLat: number, southLat: number) {
    const northEnd = this.map.latLngToContainerPoint({
      lat: northLat,
      lng: longitude,
    });

    const southEnd = this.map.latLngToContainerPoint({
      lat: southLat,
      lng: longitude,
    });

    ctx.beginPath();
    ctx.moveTo(northEnd.x, northEnd.y);
    ctx.lineTo(southEnd.x, southEnd.y);
    ctx.stroke();
  }
}

export { GarsGraticule };
