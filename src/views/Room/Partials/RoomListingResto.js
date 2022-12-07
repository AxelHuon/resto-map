import React from 'react';

const RoomListingResto = ({restaurants, currentUser, onClickChangeResto}) => {



	return (
		<section className={"section-room-listing-resto"}>
			<div className={"section-room-listing-resto-container"}>
				<ul>

				{restaurants.map((item,index)=>{
					if (item.id == currentUser.choosenResto){
										return(
						<li className={"text-20 active text-black bold"} key={index}>{item.name}</li>
					)
					}else{
					return(
						<li onClick={(e)=>onClickChangeResto(item.id)} className={"text-20 text-black bold"} key={index}>{item.name}</li>
					)
					}
				})}
				</ul>
			</div>
		</section>
	);
};

export default RoomListingResto;

