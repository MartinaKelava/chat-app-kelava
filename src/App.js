import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Messages from "./Components/Messages";
import Input from "./Components/Input";

import { randomColor } from "./utils/nameGenerator";
import { randomName } from "./utils/nameGenerator";
import "./index";
import "./App.css";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [member, setMember] = useState({
    username: randomName(),
    color: randomColor(),
  });

  const droneRef = useRef(
    new window.Scaledrone(process.env.REACT_APP_SCALEDRONE_KEY, {
      data: member,
    })
  );

  const onSendMessage = (message) => {
    console.log("Send msg triggered");
    droneRef.current.publish({
      room: process.env.REACT_APP_SCALEDRONE_ROOM,
      message,
    });
  };

  useEffect(() => {
    const drone = droneRef.current;
    drone.on("open", (error) => {
      if (error) {
        console.error(error);
        return;
      }
      setMember((prevMember) => ({ ...prevMember, id: drone.clientId }));
    });

    const room = drone.subscribe(process.env.REACT_APP_SCALEDRONE_ROOM);
    room.on("data", (data, member) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: uuidv4(), member, text: data },
      ]);
    });
  }, []);

  return (
    <div className="YourComponent">
      <div className="App">
        <div className="App-header">
          <h1>My Chat App</h1>
        </div>
        <Messages messages={messages} currentMember={member} />
        <Input onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};

export default ChatApp;
