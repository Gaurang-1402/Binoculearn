import React, { useState } from "react";
import SendMessageButton from "../../resources/images/sendMessageButton.svg";
import * as webRTCHandler from "../../utils/webRTCHandler";
import { sentimentToEmoji } from "./Messages";
import { connect } from "react-redux";


const NewMessage = ({messages}) => {
  const [message, setMessage] = useState("");

  const handleTextChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      // send message to other users
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (message.length > 0) {
      webRTCHandler.sendMessageUsingDataChannel(message);
      setMessage("");
    }
  };


  const sentimentArrCount=[0,0,0]
  messages.forEach(e => {
    if(e.sentiment>0) sentimentArrCount[2]++;
    else if(e.sentiment===0) sentimentArrCount[1]++;
    else sentimentArrCount[0]++;
  })

  let overallMeetingSentiment=1
  if(sentimentArrCount[0]>=0.2){
    overallMeetingSentiment=-1;
  }else if(sentimentArrCount[1]>=0.2){
    overallMeetingSentiment=0;
  }else{
    overallMeetingSentiment=1;
  }

  return (
    <div>

      <div style={{color: 'white', fontSize: '14px', textAlign: 'center', width: '100%'}}>Overall meeting sentiment: {sentimentToEmoji(overallMeetingSentiment)}</div>

      <div className="new_message_container">
        <input
          className="new_message_input"
          value={message}
          onChange={handleTextChange}
          placeholder="Type your message ..."
          type="text"
          onKeyDown={handleKeyPressed}
        />
        <img
          className="new_message_button"
          src={SendMessageButton}
          onClick={sendMessage}
        />
      </div>
    </div>
  );
};


const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};



export default connect(mapStoreStateToProps)(NewMessage);
