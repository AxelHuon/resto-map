const rooms = [{
	id: "1",
	finalPoint: {
		long: 48.892670, lat: 2.237030,
	},

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

