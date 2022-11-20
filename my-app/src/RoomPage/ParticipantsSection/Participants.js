import React from "react";
import { connect } from "react-redux";
import { setActiveConversation } from "../../store/actions";

const SingleParticipant = (props) => {
  const {
    identity,
    lastItem,
    participant,
    setActiveConversationAction,
    socketId,
  } = props;

  const handleOpenActiveChatbox = () => {
    if (participant.socketId !== socketId) {
      setActiveConversationAction(participant);
    }
  };

  return (
    <>
      <p className="participants_paragraph" onClick={handleOpenActiveChatbox}>
        {identity}
      </p>
      {!lastItem && <span className="participants_separator_line"></span>}
    </>
  );
};

const Participants = ({
  participants,
  setActiveConversationAction,
  socketId,
}) => {
  return (
    <div className="participants_container">
      {participants.map((participant, index) => {
        return (
          <SingleParticipant
            key={participant.identity}
            lastItem={participants.length === index + 1}
            participant={participant}
            identity={participant.identity}
            setActiveConversationAction={setActiveConversationAction}
            socketId={socketId}
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

const mapActionsToProps = (dispatch) => {
  return {
    setActiveConversationAction: (activeConversation) =>
      dispatch(setActiveConversation(activeConversation)),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(Participants);
