const rooms = [
  {
    id: "1",
    finalPoint: {
      long: 48.890011,
      lat: 2.19702,
    },
  },
  {
    id: "2",
    finalPoint: {
      long: 48.890011,
      lat: 2.19702,
    },
  },
  {
    id: "3",
    finalPoint: {
      long: 48.890011,
      lat: 2.19702,
    },
  },
];

export const getRoom = (roomId) => {
  let room = {};
  rooms.map((item) => {
    if (item.id === roomId) {
      room = item;
    }
  });
  return room;
};
