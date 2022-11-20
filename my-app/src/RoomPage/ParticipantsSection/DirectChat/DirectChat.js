import React, { useState, useEffect } from "react";
import MessagesContainer from "./MessagesContainer";
import NewMessage from "./NewMessage";
import ConversationNotChosen from "./ConversationNotChosen";
import { connect } from "react-redux";
import DirectChatHeader from "./DirectChatHeader";

const getDirectChatHistory = (directChatHistory, socketId = null) => {
  console.log(directChatHistory);
  console.log(socketId);
  if (!socketId || !directChatHistory) {
    return [];
  }

  const history = directChatHistory.find((h) => h.socketId === socketId);

  return history ? history.chatHistory : [];
};

const DirectChat = ({ activeConversation, directChatHistory }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(
      getDirectChatHistory(
        directChatHistory,
        activeConversation ? activeConversation.socketId : null
      )
    );
  }, [activeConversation, directChatHistory]);

  return (
    <div className="direct_chat_container">
      <DirectChatHeader activeConversation={activeConversation} />
      <MessagesContainer messages={messages} />
      <NewMessage />
      {!activeConversation && <ConversationNotChosen />}
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps)(DirectChat);
