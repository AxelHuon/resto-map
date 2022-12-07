import React from 'react';

const RoomMapChatButton = ({onClickChatButton}) => {
	return (<section className={"section-room-map-chat-button"}>
		<aside className={"section-room-map-chat-button-container"}>
			{/*Map*/}
			<button onClick={onClickChatButton} className={"button-chat"}>
				<img src={"/assets/pictos/message.svg"} alt={"message icon"}/>
			</button>
		</aside>
	</section>);
};

export default RoomMapChatButton;
