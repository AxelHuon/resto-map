import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import {getUserRoomCollection} from "../../services/ServiceUsers";
import {getRoom} from "../../services/ServiceRoom";
import {getRestaurantCollection} from "../../services/ServiceRestaurant";
import RoomMapChatButton from "./Partials/RoomMapChatButton";
import RoomChat from "./Partials/RoomChat";
import RoomListingResto from "./Partials/RoomListingResto";
import RoomAllUsers from "./Partials/RoomAllUsers";
import Button from "../../components/Atomes/Buttons/Buttons";

const Room = ({socket}) => {

	const paramsRoom = useParams()
	//get les users de la room
	const [users, setUsers] = useState([]);
	//Identifier le user connecté sur la page
	const [currentUser, setCurrentUser] = useState();
	//Get info de la room
	const [room, setRoom] = useState(getRoom(paramsRoom.idRoom));
	const [restaurants, setRestaurants] = useState(getRestaurantCollection);

	const [chatIsDisplay, setChatIsDisplay] = useState(false);


	const joinRoom = () =>{
		if (currentUser !== "" && room !==""){
			socket.emit("join_room",room)
		}
	}

	joinRoom()


	const handleClickChatDisplay = () =>{
		setChatIsDisplay(true)
	}

	const CloseOnClickChat = () =>{
		setChatIsDisplay(false)
	}


	const [currentNameUser, setCurrentNameUser] = useState("");
	const addUser = async () =>{
		if (currentNameUser){
			let newUser = {
				id: String(users.length + 1),
				name: currentNameUser,
				location: {
					long: 48.9092443,
					lat: 2.2247678
				},
				roomId: "1",
				choosenResto: "1"
			}
			const data = {
				room:room.id,
				user:newUser
			}
			await socket.emit("add_user", data)
			setCurrentUser(newUser)
			setUsers([...users,newUser])
		}
	}
	useEffect(() => {
		socket.on("receive_new_user", (data) => {
			let newUser = data.user
			setUsers((users) => [...users, newUser])
		})
	}, [socket]);


	const changeChoosenResto = async (newResto) =>{
		const data = {
			resto : newResto,
			room:room.id,
			user:currentUser.id
		}
		await socket.emit("change_resto", data)
		//Change le currentUser
		let newCurrentUser = {
			id : currentUser.id,
			name : currentUser.name,
			location:{
				long: currentUser.long, lat:currentUser.lat
			},
			roomId : currentUser.roomId,
			choosenResto : newResto
		}
		setCurrentUser(newCurrentUser)
		//Change dans all users
		const newState = users.map(obj => {
			if (obj.id === currentUser.id) {
				return {...obj, choosenResto: newResto};
			}
			return obj;
		});
		setUsers(newState);
	};

	const changePositionFinalPoint = async (newLocation) =>{
		//Change dans all users
		setRoom({
			id : room.id,
			finalPoint : {
				lat : newLocation.lng,
				long : newLocation.lat
			}
		})
		let data = {
			room : room.id,
			newLocation : newLocation
		}
		await socket.emit("update_final_point", data)
	}



	useEffect(() => {
		socket.on("receive_new_location", (data) => {
			setRoom({
				id:room.id,
				finalPoint : {
					lat : data.newLocation.lng,
					long : data.newLocation.lat
				}
			})
		})
	}, [socket]);


	useEffect(() => {
		socket.on("receive_new_resto", (data) => {
			setUsers(prevNewUsers => {
				const newUsers = prevNewUsers.map(obj => {
					// 👇️ if id equals 2, update country property
					if (obj.id === data.user) {
						return {...obj, choosenResto: data.resto};
					}
					return obj;
				});
				return newUsers;
			});
		})
	}, [socket]);



	//pour l'heure de rendez vous
	const [currentTime, setCurrentTime] = useState([])
	const [allTime, setAllTime] = useState([])

	const sendTime = async () => {
		const timeContent = {
			room: room.id, user: currentUser.name, time: currentTime
		}
		await socket.emit("send_time", timeContent)
		setAllTime((allTime) => [...allTime, timeContent])
	}

	useEffect(() => {
		socket.on("receive_time", (data) => {
			setAllTime((allTime) => [...allTime, data])
		})
	}, [socket]);


	if (currentUser){
	return (<>
			<RoomAllUsers room={room} users={users} currentUser={currentUser}/>
			<RoomMapChatButton currentUser={currentUser} changePositionFinalPoint={changePositionFinalPoint} room={room} users={users} restaurants={restaurants} onClickChatButton={(e) => handleClickChatDisplay()}/>
			<RoomChat room={room} socket={socket} CloseOnClickChat={(e) => CloseOnClickChat(e)} chatIsDisplay={chatIsDisplay} currentUser={currentUser}/>
			<div className={"time-to-go background-red"}>
			{allTime.map((item, index) => {
						if (allTime.length - 1 === index) {
							return (<li key={index}><p
								className={"text-black text-23 regular"}>Le rendez vous a été fixé
								a {item.time}h par {item.user}.
							</p></li>)
						}
					})}
			</div>
			<RoomMapChatButton changePositionFinalPoint={changePositionFinalPoint} room={room} users={users} restaurants={restaurants} onClickChatButton={(e) => handleClickChatDisplay()}/>
			<RoomChat room={room} socket={socket} CloseOnClickChat={(e) => CloseOnClickChat(e)} chatIsDisplay={chatIsDisplay} currentUser={currentUser} currentTime={currentTime}  setCurrentTime={setCurrentTime} onClickChangeCurrentTime={sendTime}/>
			<RoomListingResto onClickChangeResto={changeChoosenResto} currentUser={currentUser} restaurants={restaurants}/>

		</>);
	}else{
		return (
			<div className={"add-user"}>
				<label className={"text-20 text-white medium"}>Veuillez rensignez votre nom</label>
				<input placeholder={"Exemple : Axel"} onChange={(e)=>setCurrentNameUser(e.target.value)} className={"text-15 text-white regular"} type={"text"} name={"nameUser"}/>
				<Button onClick={addUser} title={"Commencer"} styleSelected={"btn-custom text-white text-15 medium"}/>
			</div>
		)
	}
};

export default Room;
