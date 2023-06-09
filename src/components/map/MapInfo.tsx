import React from "react";
import { Map, Marker } from "pigeon-maps";

const MAPTILER_ACCESS_TOKEN = "7RxCKlpDwfMMbowEvSxv";
const MAP_ID = "dataviz";

function mapTiler(x: any, y: any, z: any, dpr: any) {
  return `https://api.maptiler.com/maps/${MAP_ID}/256/${z}/${x}/${y}${
    dpr >= 2 ? "@2x" : ""
  }.png?key=${MAPTILER_ACCESS_TOKEN}`;
}

function MyMapInfo(props: any) {
  const { className } = props;
  return (
    <div className={className}>
      <Map
        provider={mapTiler}
        dprs={[1, 2]} // add this to support hidpi/retina (2x) maps if your provider supports them
        height={600}
        defaultCenter={[49.836148, 24.025275]}
        defaultZoom={11}
      >
        <Marker width={50} anchor={[50.879, 4.6997]} />

        <Marker width={50} anchor={[50.450001, 30.523333]}></Marker>
      </Map>
    </div>
  );
}
export default MyMapInfo;
