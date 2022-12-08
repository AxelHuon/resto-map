import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L, {Icon} from 'leaflet'
import '../../../style/main.css';
import {restoreOutline} from "leaflet/src/dom/DomUtil";

const RoomMap = ({restaurants, users, room, changePositionFinalPoint, currentUser}) => {

	const [postionCenterMap, setPostionCenterMap] = useState([48.893139, 2.226910]);
	const customIcon = L.divIcon({
		className: 'custom-div-icon user', html: "<div><img src='assets/pictos/marker-user.svg'> </div>", iconSize: [30, 42], iconAnchor: [15, 42]
	});
	const customIconCurrentUser = L.divIcon({
		className: 'custom-div-icon user', html: "<div><img src='assets/pictos/marker-current-user.svg'> </div>", iconSize: [30, 42], iconAnchor: [15, 42]
	});
	const customIconResto= L.divIcon({
		className: 'custom-div-icon resto', html: "<div><img src='assets/pictos/marker-resto.svg'></div>", iconSize: [30, 42], iconAnchor: [15, 42]
	});
	const customIconFinalPoint= L.divIcon({
		className: 'custom-div-icon final-point', html: "<div>final point</div>", iconSize: [30, 42], iconAnchor: [15, 42]
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
	const markerRef = useRef(null)
	const eventHandlers = useMemo(
		() => ({
			dragend() {
				const marker = markerRef.current
				if (marker != null) {
					changePositionFinalPoint(marker.getLatLng())
				}
			},
		}),
		[],
	)


	const [allPostionResto, setAllPostionResto] = useState([]);


	useEffect(() => {
		let arrayAllPositions = []
		restaurantsSelected.map((item)=>{
			arrayAllPositions.push([item.location.long,item.location.lat])
		})
		setAllPostionResto(arrayAllPositions)
	}, [restaurantsSelected]);

	const [allLinesRestoToFinalPoint, setAllLinesRestoToFinalPoint] = useState([]);

	useEffect(() => {
		let newLinesArray = []
		allPostionResto.map((item)=>{
			newLinesArray.push([item,[room.finalPoint.long,room.finalPoint.lat]])
		})
		setAllLinesRestoToFinalPoint(newLinesArray)
	}, [allPostionResto,room]);

	return (<div className="map" id="map">

		<MapContainer center={postionCenterMap} zoom={13} scrollWheelZoom={true}>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

			{restaurantsSelected.map((item, index) => {
				return (<Marker key={index} icon={customIconResto} position={[item.location.long, item.location.lat]}>
				</Marker>)
			})}
			<Marker ref={markerRef} draggable={true} eventHandlers={eventHandlers}
					icon={customIconFinalPoint} position={[room.finalPoint.long, room.finalPoint.lat]}>
			</Marker>
			{allLinesRestoToFinalPoint.map((item, index) => {
				return (   <Polyline positions={item} />)
			})}
		</MapContainer>
	</div>);
};

export default RoomMap;
