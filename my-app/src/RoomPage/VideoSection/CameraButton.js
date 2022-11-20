import React, { useState } from "react"

import CameraButtonImg from "../../resources/images/camera_on.png"
import CameraButtonImgOff from "../../resources/images/camera_off.png"
import * as webRTCHandler from "../../utils/webRTCHandler"

const CameraButton = () => {
  const [isLocalVideoDisabled, setIsLocalVideoDisabled] = useState(false)

  const handleCameraButtonPressed = () => {
    webRTCHandler.toggleCamera(isLocalVideoDisabled)

    setIsLocalVideoDisabled(!isLocalVideoDisabled)
  }

  return (
    <div className='video_button_container'>
      <img
        src={isLocalVideoDisabled ? CameraButtonImgOff : CameraButtonImg}
        className='video_button_image'
        onClick={handleCameraButtonPressed}
      />
    </div>
  )
}

export default CameraButton
