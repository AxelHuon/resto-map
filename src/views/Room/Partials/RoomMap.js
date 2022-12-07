import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L, { Icon } from 'leaflet'
import '../../../style/main.css';

const RoomMap = (restaurants) => {

      const customIcon = new Icon({
        iconUrl: "https://static.vecteezy.com/system/resources/previews/010/160/458/original/pin-location-icon-sign-symbol-design-free-png.png",
        iconSize: [20, 30]
      })
    
      console.log(restaurants[0])

      //set le point des coordonnée des differents points important
      const user = [48.896507, 2.229006]
      const restaurant = [48.896507, 2.223006]

      function getHoursToGo(n) {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        return  rhours 
        }

      function getMinutesToGo(n) {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return rminutes;
        }

      function getTimeToGo(n) {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return "Il faudra " + num + " minutes en tout, ce qui correspond a " + rhours + " heure et " + rminutes + " minute(s).";
        }
      const red = { color: 'red' }
      

      
function UserMarker() {
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
        
  const [arrivalPosition, setArrivalPosition] = useState(restaurant)
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setArrivalPosition(marker.getLatLng())
        }
      },
    }),
    [],
  )
  if (position !== null) {
   // calcule la distance et le temps
   const totalDistance =  L.latLng(position).distanceTo( L.latLng(restaurant)) + L.latLng(restaurant).distanceTo(L.latLng(arrivalPosition))
   const totalTime = Math.floor(totalDistance / 83)

   const timeToArrive = 13 

   let dateToArrive = new Date()
    dateToArrive.setHours(Math.trunc(timeToArrive))
    dateToArrive.setMinutes(0)

   let dateToGo =  dateToArrive
    dateToGo.setHours(dateToGo.getHours() - getHoursToGo(totalTime))
    dateToGo.setMinutes(dateToGo.getMinutes() - getMinutesToGo(totalTime))

  console.log(getTimeToGo(totalTime))
  console.log(dateToArrive)

}
  
  const Line = [
    position,
    restaurant,
    arrivalPosition,
  ]

  return  position === null ? null : (
  <>
    <Marker draggable={true} icon={customIcon} position={arrivalPosition} eventHandlers={eventHandlers} ref={markerRef}>
    <Popup>Point d'arrivé</Popup>
    </Marker>
    <Polyline pathOptions={red} positions={Line} />
    <Marker icon={customIcon} position={position}>
        <Popup>(user.name) etes ici</Popup>
     </Marker>
    </>
  )
}

	return (
        <div className="map" id="map" >
          
          <MapContainer center={user} zoom={15} scrollWheelZoom={true}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <UserMarker />
             <Marker icon={customIcon} position={restaurant}>
              <Popup>Nom du Restaurant</Popup>
            </Marker>
          </MapContainer>
        </div>
	);
};

export default RoomMap;

