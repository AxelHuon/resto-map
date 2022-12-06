import React, {useState} from 'react';
import InputText from "../../Atomes/Inputs/InputText";

const Chat = ({currentUser}) => {

	const [currentMessage, setCurrentMessage] = useState();

	const [allMessgae, setAllMessage] = useState([
	])

	const handleKeyPress = (e) =>{
		if (e.key === 'Enter') {
			const currentMessageWithUser = {
				message:currentMessage,
				user:currentUser.name
			}
			const newAllMessage = [...allMessgae, currentMessageWithUser]
			setAllMessage(newAllMessage)

			setCurrentMessage("")
		}
	}
	console.log(allMessgae)
	return (
		<section className={"section-chat"}>
			<aside className={"section-chat-container"}>
				<div className={"section-chat-container-all-message"}>
					{allMessgae.map((item,index)=>{
						return(
							<li key={index}><span style={{fontStyle:"italic"}}>{item.user} : </span>{item.message}</li>
						)
					})}
				</div>
				<InputText onKeyPress={(e) => handleKeyPress(e)} value={currentMessage} onChange={(e)=>{setCurrentMessage(e.target.value)}}/>
			</aside>
		</section>
	);
};

export default Chat;
