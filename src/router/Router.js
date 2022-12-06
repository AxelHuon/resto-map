import React from 'react';
import {Route, Routes} from "react-router-dom";
import Room from "../views/Room/Room";

const Router = () => {
	return (<div className={"container-page"}>
			<Routes>
				<Route path="/user:idCurrentUser/room:idRoom" element={<Room/>}></Route>
			</Routes>
		</div>);
};

export default Router;
