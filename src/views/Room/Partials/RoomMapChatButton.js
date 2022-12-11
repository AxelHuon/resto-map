import React from "react";
import RoomMap from "./RoomMap";
import { MapContainer } from "react-leaflet";

const RoomMapChatButton = ({
  onClickChatButton,
  users,
  restaurants,
  room,
  changePositionFinalPoint,
  currentUser,
  currentTime,
  allTime,
}) => {
  return (
    <section className={"section-room-map-chat-button"}>
      <aside className={"section-room-map-chat-button-container"}>
        <RoomMap
          currentTime={currentTime}
          currentUser={currentUser}
          changePositionFinalPoint={changePositionFinalPoint}
          allTime={allTime}
          room={room}
          users={users}
          restaurants={restaurants}
        />
        <button onClick={onClickChatButton} className={"button-chat"}>
          <img src={"/assets/pictos/message.svg"} alt={"message icon"} />
        </button>
      </aside>
    </section>
  );
};

export default RoomMapChatButton;
