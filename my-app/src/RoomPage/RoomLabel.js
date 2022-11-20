import React, { useState } from "react"
import ctc from "../resources/images/ctc.png"

const RoomLabel = ({ roomId }) => {
  const [isCopied, setIsCopied] = useState(false)

  // This is the function we wrote earlier
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text)
    } else {
      return document.execCommand("copy", true, text)
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(roomId)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true)
        setTimeout(() => {
          setIsCopied(false)
        }, 1500)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className='room_label'>
      <p className='room_label_paragraph'>Meeting ID: {roomId}</p>
      <a style={{ paddingTop: "0.5rem" }} href='#'>
        <button
          onClick={() => {
            navigator.clipboard.writeText(roomId)
          }}
          style={{
            background: "none",
            color: "inherit",
            border: "none",
            padding: 0,
            font: "inherit",
            cursor: "pointer",
            outline: "inherit",
          }}
        >
          <img style={{ width: "3rem" }} src={ctc}></img>
        </button>
      </a>
    </div>
  )
}

export default RoomLabel
