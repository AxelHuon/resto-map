const rooms = [{
	id: "1",
	finalPoint: {
		long: 0, lat: 0,
	}
},]


export const getRoom = (roomId) => {
	let room = {}
	rooms.map((item) => {
		if (item.id === roomId) {
			room = item
		}
	})
	return room
}
