
const users = [
	{
		id : "1",
		name : "Axel",
		loc : 0,
		lat : 0,
		roomId : "12",
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
