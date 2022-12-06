
const users = [
	{
		id : "1",
		name : "Axel",
		location : {
			lat : 48.893139,
			long : 2.226910
		},
		roomId : "1",
		choosenResto : 1
	},
]


export const getUserRoomCollection = (roomId) =>
{
	let usersRoom = []
	users.map((item)=>{
		if (item.roomId === roomId){
			usersRoom.push(item)
		}
	})

	return usersRoom
}
