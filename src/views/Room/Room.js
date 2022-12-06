import React from 'react';
import {useParams} from "react-router-dom";
import RoomMap from './Partials/RoomMap';

const Room = () => {

	const roomId = useParams()
	console.log(roomId.id)

	return (<div>
			<RoomMap/>
		</div>);
};

export default Room;
