import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import {getUserRoomCollection} from "../../services/ServiceUsers";
import {getRoom} from "../../services/ServiceRoom";
import {getRestaurantCollection} from "../../services/ServiceRestaurant";
import Chat from "../../components/Molecules/Chat/Chat";
import RoomMap from './Partials/RoomMap';

const Room = () => {

	const paramsRoom = useParams()
	//get les users de la room
	const [users, setUsers] = useState(getUserRoomCollection(paramsRoom.idRoom));
	//Identifier le user connecté sur la page
	const [currentUser, setCurrentUser] = useState(users.find(obj => {
		return obj.id === paramsRoom.idCurrentUser
	}));
	//Get info de la room
	const [room, setRoom] = useState(getRoom(paramsRoom.idRoom));


	const [restaurants, setRestaurants] = useState(getRestaurantCollection);

	console.log(restaurants)

	return (<section className={"section-room"}>
		<aside className={"section-room-container"}>
			<div className={"section-room-container-all-users"}>
				<ul>
					{users.map((item) => {
						return (<li key={item.id}>{item.name}</li>)
					})}
				</ul>
			</div>
			<div className={"section-room-info-room"}>
				<h3>
					Room {room.id}
				</h3>
			</div>
			<div className={"section-room-container-all-restaurants"}>
				<ul>
					{restaurants.map((item) => {
						return (<li key={item.id}>{item.name}</li>)
					})}
				</ul>
			</div>
		</aside>
		<Chat currentUser={currentUser}/>
		<RoomMap/>
	</section>);
};

export default Room;
