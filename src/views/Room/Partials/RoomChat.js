import React, {useEffect, useRef, useState} from 'react';
import InputText from "../../../components/Atomes/Inputs/TextArea";
import TextArea from "../../../components/Atomes/Inputs/TextArea";
import Button from "../../../components/Atomes/Buttons/Buttons";

const RoomChat = ({currentUser, chatIsDisplay, CloseOnClickChat, room, socket}) => {

	const [currentMessage, setCurrentMessage] = useState();

	const [allMessgae, setAllMessage] = useState([])

	const sendMessage = async () => {
		if (currentMessage != "") {
			if (currentMessage.includes("#")) {
				setCurrentMessage("")
			} else {

				const messageContent = {
					room: room.id, user: currentUser.name, message: currentMessage
				}
				await socket.emit("send_message", messageContent)
				setAllMessage((allMessage) => [...allMessage, messageContent])
			}
		}
	}

	useEffect(() => {
		socket.on("receive_message", (data) => {
			setAllMessage((allMessage) => [...allMessage, data])
		})
	}, [socket]);


	return (<section className={"section-room-chat-side-bar " + (chatIsDisplay ? "active" : " ")}>
		<aside className={"section-room-chat-side-bar-container"}>
			<button onClick={CloseOnClickChat} className={"button-chat close-button"}>
				<img src={"/assets/pictos/close.svg"}/>
			</button>
			<div className={"section-room-chat-side-bar-container-all-message"}>
				<ul>
					{allMessgae.map((item, index) => {
						if (currentUser.name === item.user) {
							return (<li className={"message-item current-user"} key={index}><span
								className={"text-13 text-white medium"}><img
								src={"/assets/image/user.png"}/> {item.user} </span><p
								className={"text-black text-13 regular"}>{item.message}
							</p></li>)
						} else {
							return (<li className={"message-item"} key={index}><span
								className={"text-13 text-white medium"}><img
								src={"/assets/image/user.png"}/> {item.user} </span><p
								className={"text-black text-13 regular"}>{item.message}
							</p></li>)
						}
					})}
				</ul>
			</div>
			<div className={"section-room-chat-side-bar-container-cta"}>
				<TextArea value={currentMessage} onChange={(e) => {
					setCurrentMessage(e.target.value)
				}}/>
				<Button styleSelected={"btn-custom text-13 text-white bold"} onClick={(e) => sendMessage()}
						title={"Envoyer"}/>
			</div>
		</aside>
	</section>);
};

export default RoomChat;
