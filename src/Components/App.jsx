import React, { Component } from "react";
import Messages from "./Messages";
import Input from "./Input";

const randomName = () => {
  const names = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eva",
    "Frank",
    "Grace",
    "Henry",
  ];
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
};

const randomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

class ChatApp extends Component {
  state = {
    messages: [
      {
        messages: [],
        member: {
          username: randomName(),
          color: randomColor(),
        },
      },
    ],
    member: {
      username: randomName(),
      color: randomColor(),
    },
  };

  onSendMessage = (message) => {
    this.drone.publish({
      room: "MartinaKelavaApp",
      message: {
        text: message,
        member: this.state.member,
      },
    });
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>My Chat App</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }
}
export default ChatApp;
