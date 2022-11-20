import React, { useEffect } from "react"
import logo from "../resources/images/logo.png"
import rhs from "../resources/images/rhs.png"
import github from "../resources/images/GitHub.png"
import text from "../resources/images/text.png"

import ConnectingButtons from "./ConnectingButtons"
import { connect } from "react-redux"
import { setIsRoomHost } from "../store/actions"

import "./IntroductionPage.css"

const IntroductionPage = ({ setIsRoomHostAction }) => {
  useEffect(() => {
    setIsRoomHostAction(false)
  }, [])

  return (
    <div className='introduction_page_container'>
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

      <div className='row'>
        <div className='column'>
          <div
            className='introduction_page_content'
            style={{ display: "flex" }}
          >
            <div className='introduction_page_panel'>
              <p className='main-text'>
                <span className='learn'>Learning</span> with <br></br>
                <span className='low-bandwidth'>low-bandwidth </span>
                internet.
              </p>{" "}
            </div>
          </div>
          <div className='connection_buttons_containers'>
            <ConnectingButtons />
            <img
              style={{ width: "30rem", marginTop: "3rem" }}
              src={text}
              className='introduction_page_image'
            ></img>
          </div>
        </div>
        <div className='column'>
          <div
            className='introduction_page_content'
            style={{ display: "flex" }}
          >
            <img style={{ width: "30rem" }} src={rhs} className=''></img>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapActionsToProps = (dispatch) => {
  return {
    setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
  }
}

export default connect(null, mapActionsToProps)(IntroductionPage)
