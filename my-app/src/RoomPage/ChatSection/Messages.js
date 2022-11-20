import React from "react";
import { connect } from "react-redux";

export const sentimentToEmoji = (sentiment) => {
  return sentiment === 0 ? '😐' : (sentiment > 0 ? '🙂' : '😥')
}




const Message = ({ author, content, sameAuthor, messageCreatedByMe, sentiment }) => {
  const alignClass = messageCreatedByMe
    ? "message_align_right"
    : "message_align_left";

  const authorText = messageCreatedByMe ? "You" : author;

  const contentAdditionalStyles = messageCreatedByMe
    ? "message_right_styles"
    : "message_left_styles";

  return (
    <div className={`message_container ${alignClass}`} style={{ position: 'relative' }}>
      {!sameAuthor && <p className="message_title">{authorText}</p>}
      <p style={{ color: 'white', }} className={`message_content ${contentAdditionalStyles}`}>{content} </p>
      <p style={{ color: 'white', fontSize: '11px', position: 'absolute', bottom: '-30px' }}>Sentiment: {sentimentToEmoji(sentiment)}</p>
    </div>
  );
};

const Messages = ({ messages }) => {
  return (
    <div className="messages_container">
      {messages.map((message, index) => {
        const sameAuthor =
          index > 0 && message.identity === messages[index - 1].identity;

        return (
          <Message
            key={`${message.content}${index}`}
            author={message.identity}
            content={message.content}
            sentiment={message.sentiment}
            sameAuthor={sameAuthor}
            messageCreatedByMe={message.messageCreatedByMe}
          />
        );
      })}
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps)(Messages);
