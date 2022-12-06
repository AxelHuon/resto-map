import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {getUserRoomCollection} from "../../services/ServiceUsers";

const Room = () => {

	const paramsRoom = useParams()

	//get les users de la room
	const dataUsersFromFunction = getUserRoomCollection(paramsRoom.idRoom)
	const [users, setUsers] = useState(dataUsersFromFunction);

	//Identifier le user connecté sur la page
	const [currentUser, setCurrentUser] = useState(users.find(obj => { return obj.id === paramsRoom.idCurrentUser}));




	return (
		<div>

	</div>);
};

export default Room;
