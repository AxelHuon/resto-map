import React, { useEffect, useState } from "react";
import TextArea from "../../../components/Atomes/Inputs/TextArea";
import Button from "../../../components/Atomes/Buttons/Buttons";
import InputTime from "../../../components/Atomes/Inputs/InputTime";

const RoomChat = ({
  currentUser,
  currentTime,
  onClickChangeCurrentTime,
  setCurrentTime,
  chatIsDisplay,
  CloseOnClickChat,
  room,
  socket,
}) => {
  const [currentMessage, setCurrentMessage] = useState();
  const [allMessgae, setAllMessage] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageContent = {
        room: room.id,
        user: currentUser.name,
        message: currentMessage,
      };
      await socket.emit("send_message", messageContent);
      setAllMessage((allMessage) => [...allMessage, messageContent]);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setAllMessage((allMessage) => [...allMessage, data]);
    });
  }, [socket]);

  return (
    <section
      className={
        "section-room-chat-side-bar " + (chatIsDisplay ? "active" : " ")
      }
    >
      <aside className={"section-room-chat-side-bar-container"}>
        <button
          onClick={CloseOnClickChat}
          className={"button-chat close-button"}
        >
          <img src={"/assets/pictos/close.svg"} alt={"img"} />
        </button>
        <div className={"section-room-chat-side-bar-container-all-message"}>
          <ul>
            {allMessgae.map((item, index) => {
              if (currentUser.name === item.user) {
                return (
                  <li className={"message-item current-user"} key={index}>
                    <span className={"text-13 text-white medium"}>
                      <img src={"/assets/image/user.png"} alt={"img"} />{" "}
                      {item.user}{" "}
                    </span>
                    <p className={"text-black text-13 regular"}>
                      {item.message}
                    </p>
                  </li>
                );
              } else {
                return (
                  <li className={"message-item"} key={index}>
                    <span className={"text-13 text-white medium"}>
                      <img src={"/assets/image/user.png"} alt={"img"} />{" "}
                      {item.user}{" "}
                    </span>
                    <p className={"text-black text-13 regular"}>
                      {item.message}
                    </p>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div className={"section-room-chat-side-bar-container-cta"}>
          <TextArea
            value={currentMessage}
            onChange={(e) => {
              setCurrentMessage(e.target.value);
            }}
          />
          <Button
            styleSelected={"btn-custom text-13 text-white bold textarea-button"}
            className={""}
            onClick={(e) => sendMessage()}
            title={"Envoyer"}
          />
        </div>
        <div className={"section-room-chat-side-bar-container-cta"}>
          <InputTime
            value={currentTime}
            onChange={(e) => {
              setCurrentTime(e.target.value);
            }}
          />
          <Button
            styleSelected={"btn-custom text-13 text-white bold textarea-button"}
            onClick={(e) => onClickChangeCurrentTime()}
            title={"heure"}
          />
        </div>
      </aside>
    </section>
  );
};

export default RoomChat;
