import React from 'react';

const RoomAllUsers = ({room, users, currentUser}) => {
	return (
		<section className={"section-all-users"}>
			<aside className={"section-all-users-container"}>
				<div className={"section-all-users-container-title"}>
					<h3 className={"text-35 text-white bold"}>
						Room{room.id}
					</h3>
				</div>
				<div className={"section-all-users-container-listing"}><ul>
					{users.map((item,index)=>{
						if (currentUser.id == item.id){
							return(
							<li className={"text-15 text-primary medium"} key={index}><img src={"/assets/pictos/user-red.svg"}/> {item.name}</li>
							)
						}else{
							return (
								<li className={"text-15 text-white medium"} key={index}><img src={"/assets/pictos/user-white.svg"}/>{item.name}</li>
							)
						}
					})}
					</ul>
				</div>
			</aside>
		</section>
	);
};

export default RoomAllUsers;
