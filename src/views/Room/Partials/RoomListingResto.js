import React from 'react';

const RoomListingResto = ({restaurants}) => {

	console.log(restaurants)
	return (
		<section className={"section-room-listing-resto"}>
			<div className={"section-room-listing-resto-container"}>
				<ul>

				{restaurants.map((item,index)=>{
					return(
						<li className={"text-20 text-white medium"} key={index}>{item.name}</li>
					)
				})}
				</ul>
			</div>
		</section>
	);
};

export default RoomListingResto;

