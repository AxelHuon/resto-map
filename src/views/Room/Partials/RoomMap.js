import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L, {Icon} from 'leaflet'
import '../../../style/main.css';

const RoomMap = ({restaurants, users, room}) => {

	const [postionCenterMap, setPostionCenterMap] = useState([48.893139, 2.226910]);


	const customIcon = L.divIcon({
		className: 'custom-div-icon user', html: "<div>user</div>", iconSize: [30, 42], iconAnchor: [15, 42]
	});

	const customIconResto= L.divIcon({
		className: 'custom-div-icon resto', html: "<div>resto</div>", iconSize: [30, 42], iconAnchor: [15, 42]
	});
	const [restaurantsSelected, setRestaurantsSelected] = useState([]);

	useEffect(() => {
		let arrayID  = []
		let arrayObject = []
		users.map((item)=>{
			arrayID.push(item.choosenResto)
		})
		restaurants.map((item)=>{
			if (arrayID.includes(item.id)){
				arrayObject.push(item)
				setRestaurantsSelected(arrayObject)
			}
		})
	}, [users]);

	return (<div className="map" id="map">

		<MapContainer center={postionCenterMap} zoom={13} scrollWheelZoom={true}>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
			{users.map((item,index) => {
				return (<Marker key={index} icon={customIcon} position={[item.location.long, item.location.lat]}>
					</Marker>)
			})}
			{restaurantsSelected.map((item, index) => {
				return (<Marker key={index} icon={customIconResto} position={[item.location.long, item.location.lat]}>
				</Marker>)
			})}
		</MapContainer>
	</div>);
};

export default RoomMap;
