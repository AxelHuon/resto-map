import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import '../../../style/main.css';

const RoomMap = () => {

    const position = [48.893139, 2.226910]
      const customIcon = new Icon({
        iconUrl: "https://static.vecteezy.com/system/resources/previews/010/160/458/original/pin-location-icon-sign-symbol-design-free-png.png",
        iconSize: [20, 30]
      })
    
	return (
        <div className="map" id="map" >
          <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <Marker icon={customIcon} position={position}>
              <Popup>Nom du Restaurant/ user/point d'arrivé</Popup>
            </Marker>
          </MapContainer>
        </div>
	);
};

export default RoomMap;

