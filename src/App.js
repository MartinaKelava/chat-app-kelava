import React, { useState, useEffect } from "react";
import Messages from "./Components/Messages";
import Input from "./Components/Input";
import "./index";
import "./App.css";

const randomName = () => {
  const names = ["Martina", "Ivan", "Mattea", "David", "Eva"];
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
};

// Function to generate a random color (HEX format)
const randomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

const ChatApp = () => {
  const [messages, setMessages] = useState([
    {
      messages: [],
      member: {
        username: randomName(),
        color: randomColor(),
      },
    },
  ]);

  const [member, setMember] = useState({
    username: randomName(),
    color: randomColor(),
  });

  useEffect(() => {
    const drone = new window.Scaledrone("kQHdfneFxV1mQIVf", {
      data: member,
    });

    drone.on("open", (error) => {
      if (error) {
        console.error(error);
        return;
      }

      const updatedMember = { ...member, id: drone.clientId };
      setMember(updatedMember);
    });

    const room = drone.subscribe("MartinaKelavaApp");
    room.on("data", (data, member) => {
      setMessages((prevMessages) => [...prevMessages, { member, text: data }]);
    });

    // Cleanup function for the effect
    return () => {
      drone.close();
      room.unsubscribe();
    };
  }, [member]);

  const onSendMessage = (text) => {
    // Your logic for sending messages goes here
  };

  return (
    <div className="YourComponent">
      <h1>Chat App</h1>
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
