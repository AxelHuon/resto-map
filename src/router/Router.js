import React from 'react';
import {Route, Routes} from "react-router-dom";
import Room from "../views/Room/Room";

const Router = ({socket}) => {
	return (<div className={"container-page"}>
			<Routes>
				<Route  path="/user:idCurrentUser/room:idRoom" element={<Room socket={socket}/>}></Route>
			</Routes>
		</div>);
};

export default Router;
