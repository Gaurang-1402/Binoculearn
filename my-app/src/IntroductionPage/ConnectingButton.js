import React from "react"
import host from "../resources/images/host_meeting.png"
const ConnectingButton = ({
  createRoomButton = false,
  buttonText,
  onClickHandler,
}) => {
  const buttonClass = createRoomButton
    ? "create_room_button"
    : "join_room_button"

  return (
    <button className={buttonClass} onClick={onClickHandler}>
      {buttonText}
    </button>
  )
}

export default ConnectingButton
