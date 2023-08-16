import React from "react";

const Messages = ({ messages, currentMember }) => {
  return (
    <div className="messages">
      {messages.map((message, index) => (
        <div key={index} style={{ color: message.member.color }}>
          <strong>{message.member.username}</strong>: {message.text}
        </div>
      ))}
    </div>
  );
};

export default Messages;
