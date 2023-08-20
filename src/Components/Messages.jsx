import React from "react";

// Helper function to t´render list of messages
const renderMessage = (message, currentMember) => {
  const { id, member, text } = message;
  const messageFromMe = member && member.id === currentMember.id;
  const className = messageFromMe
    ? "Messages-message currentMember"
    : "Messages-message";

  return (
    <li key={id} className={className}>
      <span
        className="icon"
        style={{ backgroundColor: member.clientData.color }}
      />
      <div className="Message-content">
        <div className="username">{member.clientData.username}</div>
        <div className="text">{text}</div>
      </div>
    </li>
  );
};

const Messages = ({ messages, currentMember }) => {
  console.log("Current membr", currentMember);
  return (
    <div className="Messages-list">
      <ul className="List">
        {messages.map((m) => renderMessage(m, currentMember))}
      </ul>
    </div>
  );
};

export default Messages;
