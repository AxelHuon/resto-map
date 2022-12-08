import React from 'react';
import RoomMap from "./RoomMap";

const RoomMapChatButton = ({onClickChatButton,users, restaurants,room,changePositionFinalPoint, currentUser}) => {
	return (<section className={"section-room-map-chat-button"}>
		<aside className={"section-room-map-chat-button-container"}>
			<RoomMap currentUser={currentUser} changePositionFinalPoint={changePositionFinalPoint} room={room} users={users} restaurants={restaurants}/>
			<button onClick={onClickChatButton} className={"button-chat"}>
				<img src={"/assets/pictos/message.svg"} alt={"message icon"}/>
			</button>
		</aside>
	</section>);
};

export default RoomMapChatButton;
