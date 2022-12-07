const users = [{
	id: "1", name: "Axel",
	location: {
		long: 48.9092443, lat: 2.2247678
	}, roomId: "1", choosenResto: "1"
}, {
	id: "2", name: "Pierre", location: {
		long: 48.893139, lat: 2.226910
	}, roomId: "1", choosenResto: "1",
},]


export const getUserRoomCollection = (roomId) => {
	let usersRoom = []
	users.map((item) => {
		if (item.roomId === roomId) {
			usersRoom.push(item)
		}
	})

	return usersRoom
}
