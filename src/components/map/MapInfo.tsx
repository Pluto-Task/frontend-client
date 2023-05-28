import React from 'react';
import { Map, Marker } from 'pigeon-maps';

function PigeonMap() {
  const handleMapClick = ({ latLng, event }) => {
    const { lat, lng } = latLng;
    console.log('Координати кліку:', lat, lng);
  };

  return (
    <Map center={[51.5074, -0.1278]} zoom={10} height={400} onClick={handleMapClick}>
      {/* Маркери та інші елементи на карті */}
      <Marker anchor={[51.5074, -0.1278]} />
    </Map>
  );
}

export default PigeonMap;