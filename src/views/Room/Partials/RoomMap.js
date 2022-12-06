import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L, { Icon } from 'leaflet'
import '../../../style/main.css';

const RoomMap = () => {

      const customIcon = new Icon({
        iconUrl: "https://static.vecteezy.com/system/resources/previews/010/160/458/original/pin-location-icon-sign-symbol-design-free-png.png",
        iconSize: [20, 30]
      })
    
      //set le point des coordonnée des differents points important
      const user = [48.896507, 2.229006]
      const restaurant = [48.896507, 2.223006]
      const pointArrive = [48.893139, 2.226910]
      // convertir le point de coordonnée en var pour l'utiliser dans la methode DistanceTo
      var fromLatUser = L.latLng(user);
      var toLatRestaurant = L.latLng(restaurant);
      var toLatPointArrive = L.latLng(pointArrive);
      // recupere la distance entre deux points
      var distanceFirstRoute = fromLatUser.distanceTo(toLatRestaurant)
      var distanceSecondRoute = toLatRestaurant.distanceTo(toLatPointArrive)
      // calcule la distance et le temps
      var totalDistance = distanceFirstRoute + distanceSecondRoute
      var totalTemps = totalDistance / 83
      

      function LocationMarker() {
        const [position, setPosition] = useState(null)
        const map = useMapEvents({ 
          move() {
            map.locate()
          },
          locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
          },
        })
      
        return position === null ? null : (
          <Marker icon={customIcon} position={position}>
            <Popup>You are here</Popup>
          </Marker>
        )
      }
      


	return (
        <div className="map" id="map" >
          <MapContainer center={pointArrive} zoom={13} scrollWheelZoom={true}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <LocationMarker />
            {/* <Marker  pointArrive={pointArrive}>
              <Popup>Nom du Restaurant/ user/point d'arrivé</Popup>
            </Marker> */}
          </MapContainer>
        </div>
	);
};

export default RoomMap;

