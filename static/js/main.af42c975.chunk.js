(this["webpackJsonpreact-leaflet-gars-graticule-example"]=this["webpackJsonpreact-leaflet-gars-graticule-example"]||[]).push([[0],{19:function(t,i,e){},20:function(t,i,e){},22:function(t,i,e){"use strict";e.r(i);var a=e(0),s=e.n(a),n=e(11),r=e.n(n),o=(e(19),e(25)),h=e(26),l=e(28),E=e(27),_=(e(20),e(24)),c=["A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","T","U","V","W","X","Y","Z"];function T(t){var i=t- -90;return c[Math.floor(i/12)]+c[Math.floor(i%12/.5)]}function p(t){for(var i=1;t>-180;)t-=.5,i++;for(var e=i.toString();e.length<3;)e="0"+e;return e}var m,L=function(t){var i=Object(_.a)();new I(i,t.name,t.checked);return null};!function(t){t[t.Thirty=0]="Thirty",t[t.Fifteen=1]="Fifteen",t[t.Five=2]="Five"}(m||(m={}));var I=function(){function t(t,i,e){this._HALF_DEGREE=.5,this._QUARTER_DEGREE=.25,this._ONE_TWELFTH_DEGREE=this._QUARTER_DEGREE/3,this.showGrid=!0,this._THIRTY_MINUTES_MIN_ZOOM=8,this._FIFTEEN_MINUTES_MIN_ZOOM=11,this._FIVE_MINUTES_MIN_ZOOM=12,this._THIRTY_MINUTES_LINE_WIDTH=3,this._FIFTEEN_MINUTES_LINE_WIDTH=2,this._FIVE_MINUTES_LINE_WIDTH=1,this._THIRTY_MINUTES_LINE_COLOR="#F79800",this._FIFTEEN_MINUTES_LINE_COLOR="#2C6FB6",this._FIVE_MINUTES_LINE_COLOR="#FFF",this._FONT="16px Courier New",this._FONT_COLOUR="#000",this.map=t,this.canvas=document.createElement("canvas"),this.canvas.classList.add("leaflet-zoom-animated"),this.map.getPanes().overlayPane.hasChildNodes()||this.map.getPanes().overlayPane.appendChild(this.canvas),this.options={showGrid:!0},this.map.on("viewreset",this.reset,this),this.map.on("move",this.reset,this),this.map.on("overlayadd",this.showGraticule,this),this.map.on("overlayremove",this.clearRect,this),this.name=i.replace(/\s/g,""),e?(this.options.showGrid=!0,this.reset()):this.options.showGrid=!1,this.reset()}return t.prototype.clearRect=function(t){if(t.name===this.name){var i=this.canvas.getContext("2d");i&&(i.clearRect(0,0,this.canvas.width,this.canvas.height),this.showGrid=!1)}},t.prototype.showGraticule=function(t){t.name===this.name&&(this.showGrid=!0,this.reset())},t.prototype.reset=function(){var t=this.map.getSize(),i=this.map.containerPointToLayerPoint([0,0]);this.canvas.style.transform="translate3d("+i.x+"px,"+i.y+"px,0)",this.canvas.width=t.x,this.canvas.height=t.y;var e=this.canvas.getContext("2d");e&&(e.clearRect(0,0,this.canvas.width,this.canvas.height),this.drawFiveMinuteGraticules(e),this.drawFifteenMinuteGraticules(e),this.drawThirtyMinuteGraticules(e),this.drawLabels(e))},t.prototype.drawLabels=function(t){if(this.canvas&&this.map&&!(this.map.getZoom()<this._THIRTY_MINUTES_MIN_ZOOM)){t.strokeStyle=this._THIRTY_MINUTES_LINE_COLOR,t.fillStyle=this._THIRTY_MINUTES_LINE_COLOR,t.font=this._FONT;for(var i=this.map.containerPointToLatLng({x:0,y:0}),e=this.map.containerPointToLatLng({x:this.canvas.width,y:this.canvas.height}),a={lat:Math.ceil(i.lat/this._HALF_DEGREE)*this._HALF_DEGREE,lng:Math.floor(i.lng/this._HALF_DEGREE)*this._HALF_DEGREE},s={lat:Math.floor(e.lat/this._HALF_DEGREE)*this._HALF_DEGREE,lng:Math.ceil(e.lng/this._HALF_DEGREE)*this._HALF_DEGREE},n=a.lng;n<=s.lng;n+=this._HALF_DEGREE)for(var r=s.lat;r<=a.lat;r+=this._HALF_DEGREE){var o=p(n)+T(r),h=this.map.latLngToContainerPoint({lat:r+this._QUARTER_DEGREE,lng:n+this._QUARTER_DEGREE});this.drawLabel(t,o,h)}}},t.prototype.drawLabel=function(t,i,e){var a=t.measureText(i).width,s=t.measureText(i).fontBoundingBoxAscent;t.fillStyle=this._THIRTY_MINUTES_LINE_COLOR,t.fillRect(e.x-a/2-1,e.y-s+4,a+3,s+2),t.fillStyle=this._FONT_COLOUR,t.fillText(i,e.x-a/2,e.y+3)},t.prototype.drawGraticules=function(t,i){if(this.canvas&&this.map&&!(this.map.getZoom()<i.minZoom)){t.lineWidth=i.lineWidth,t.strokeStyle=i.lineColor,t.fillStyle=i.lineColor;for(var e=this.map.containerPointToLatLng({x:0,y:0}),a=this.map.containerPointToLatLng({x:this.canvas.width,y:this.canvas.height}),s=Math.floor(a.lat/this._HALF_DEGREE)*this._HALF_DEGREE,n=Math.floor(e.lng/this._HALF_DEGREE)*this._HALF_DEGREE,r=i.interval===m.Fifteen?s+this._QUARTER_DEGREE:s;r<=e.lat;r+=i.increment)i.interval===m.Five&&Math.abs(r%this._HALF_DEGREE)<1e-6||this.drawLatitudeLine(t,r,e.lng,a.lng);for(r=i.interval===m.Fifteen?n+this._QUARTER_DEGREE:n;r<=a.lng;r+=i.increment)i.interval===m.Five&&Math.abs(r%this._HALF_DEGREE)<1e-6||this.drawLongitudeLine(t,r,e.lat,a.lat)}},t.prototype.drawThirtyMinuteGraticules=function(t){var i={interval:m.Thirty,increment:this._HALF_DEGREE,minZoom:this._THIRTY_MINUTES_MIN_ZOOM,lineWidth:this._THIRTY_MINUTES_LINE_WIDTH,lineColor:this._THIRTY_MINUTES_LINE_COLOR};this.drawGraticules(t,i)},t.prototype.drawFifteenMinuteGraticules=function(t){var i={interval:m.Fifteen,increment:this._HALF_DEGREE,minZoom:this._FIFTEEN_MINUTES_MIN_ZOOM,lineWidth:this._FIFTEEN_MINUTES_LINE_WIDTH,lineColor:this._FIFTEEN_MINUTES_LINE_COLOR};this.drawGraticules(t,i)},t.prototype.drawFiveMinuteGraticules=function(t){var i={interval:m.Five,increment:this._ONE_TWELFTH_DEGREE,minZoom:this._FIVE_MINUTES_MIN_ZOOM,lineWidth:this._FIVE_MINUTES_LINE_WIDTH,lineColor:this._FIVE_MINUTES_LINE_COLOR};this.drawGraticules(t,i)},t.prototype.drawLatitudeLine=function(t,i,e,a){var s=this.map.latLngToContainerPoint({lat:i,lng:e}),n=this.map.latLngToContainerPoint({lat:i,lng:a});t.beginPath(),t.moveTo(s.x,s.y),t.lineTo(n.x,n.y),t.stroke()},t.prototype.drawLongitudeLine=function(t,i,e,a){var s=this.map.latLngToContainerPoint({lat:e,lng:i}),n=this.map.latLngToContainerPoint({lat:a,lng:i});t.beginPath(),t.moveTo(s.x,s.y),t.lineTo(n.x,n.y),t.stroke()},t}(),d=e(1),u="GARS";var v=function(){return Object(d.jsx)(o.a,{center:[45.4,-75.7],zoom:8,minZoom:3,maxZoom:16,maxBounds:[[-90,-180],[90,180]],children:Object(d.jsxs)(h.a,{position:"topright",children:[Object(d.jsx)(h.a.BaseLayer,{checked:!0,name:"ESRI Satellite",children:Object(d.jsx)(l.a,{url:"https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",attribution:'\xa9 <a href="https://wiki.openstreetmap.org/wiki/Esri"></a> contributors'})}),Object(d.jsx)(h.a.BaseLayer,{name:"ESRI Clarity",children:Object(d.jsx)(l.a,{url:"https://clarity.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",attribution:'\xa9 <a href="https://wiki.openstreetmap.org/wiki/Esri"></a> contributors'})}),Object(d.jsx)(h.a.BaseLayer,{name:"OSM Topo",children:Object(d.jsx)(l.a,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'})}),Object(d.jsx)(h.a.BaseLayer,{name:"OSM Topo",children:Object(d.jsx)(l.a,{url:"https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",attribution:"OSM"})}),Object(d.jsx)(h.a.Overlay,{checked:true,name:u,children:Object(d.jsx)(E.a,{children:Object(d.jsx)(L,{checked:true,name:u})})})]})})};r.a.render(Object(d.jsx)(s.a.StrictMode,{children:Object(d.jsx)(v,{})}),document.getElementById("root"))}},[[22,1,2]]]);
//# sourceMappingURL=main.af42c975.chunk.js.map