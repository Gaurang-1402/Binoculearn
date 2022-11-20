import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { connect } from "react-redux"
import { setIsRoomHost } from "../store/actions"
import JoinRoomTitle from "./JoinRoomTitle"
import JoinRoomContent from "./JoinRoomContent"
import github from "../resources/images/GitHub.png"
import gdpr from "../resources/images/GDPR.png"
import logo from "../resources/images/logo.png"

import "./JoinRoomPage.css"

const JoinRoomPage = (props) => {
  const { setIsRoomHostAction, isRoomHost } = props

  const search = useLocation().search

  useEffect(() => {
    const isRoomHost = new URLSearchParams(search).get("host")
    if (isRoomHost) {
      setIsRoomHostAction(true)
    }
  }, [])

  return (
    <div className='join_room_page_container'>
      <div className='introduction_page_navbar' style={{}}>
        <header className='introduction_page_header'>
          <img src={logo} className='logo introduction_page_image'></img>

          <ul className='nav'>
            <li className='navlink'>
              <a href='#'>
                <img src={github}></img>
              </a>
            </li>
          </ul>
        </header>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className='join_room_page_panel'>
          <JoinRoomTitle isRoomHost={isRoomHost} />
          <JoinRoomContent />
        </div>
      </div>
    </div>
  )
}

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
  }
}

export default connect(mapStoreStateToProps, mapActionsToProps)(JoinRoomPage)
