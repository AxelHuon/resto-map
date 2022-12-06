import React from 'react';
import {useParams} from "react-router-dom";

const Room = () => {

	const roomId = useParams()
	console.log(roomId.id)

	return (<div>
			Room view
		</div>);
};

export default Room;
