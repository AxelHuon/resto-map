import React, {useState} from 'react';
import {useParams} from "react-router-dom";

import {getUserRoomCollection} from "../../services/ServiceUsers";
import {getRoom} from "../../services/ServiceRoom";
import {getRestaurantCollection} from "../../services/ServiceRestaurant";
import RoomMapChatButton from "./Partials/RoomMapChatButton";
import RoomChat from "./Partials/RoomChat";
import RoomListingResto from "./Partials/RoomListingResto";
import RoomAllUsers from "./Partials/RoomAllUsers";

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

	const [chatIsDisplay, setChatIsDisplay] = useState(false);


	const handleClickChatDisplay = () =>{
		setChatIsDisplay(true)
	}

	const CloseOnClickChat = () =>{
		setChatIsDisplay(false)
	}

	const changeChoosenResto = (newResto) =>{
		let newCurrentUser = {
			id : currentUser.id,
			name : currentUser.name,
			roomId : currentUser.roomId,
			choosenResto : newResto

		}
		setCurrentUser(newCurrentUser)
	}

	return (<>
			<RoomAllUsers room={room} users={users} currentUser={currentUser}/>
			<RoomMapChatButton onClickChatButton={(e) => handleClickChatDisplay()}/>

			<RoomChat CloseOnClickChat={(e) => CloseOnClickChat(e)} chatIsDisplay={chatIsDisplay} currentUser={currentUser}/>
			<RoomListingResto onClickChangeResto={changeChoosenResto} currentUser={currentUser} restaurants={restaurants}/>

		</>);
};

export default Room;
