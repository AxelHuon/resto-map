import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'

const RoomMap = () => {

    const position = [51.505, -0.09]

      const customIcon = new Icon({
        iconUrl: "https://static.vecteezy.com/system/resources/previews/010/160/458/original/pin-location-icon-sign-symbol-design-free-png.png",
        iconSize: [33, 33]
      })
    
	return (
        <div className="map" id="map" >
         <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker icon={customIcon} position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
        </div>
	);
};

export default RoomMap;

