import React, { useState } from "react"
import ParticipantsLabel from "./ParticipantsLabel"
import Participants from "./Participants"
import DirectChat from "./DirectChat/DirectChat"
import { connect } from "react-redux"
import axios from "axios"
import { GET_SUMMARY_URL } from "../../utils/api"

const ParticipantsSection = ({ messages }) => {
  let text = ''
  const [summary, setSummary] = useState('Click the button below to populate with the summary. 🚀🚀🚀')

  messages.forEach(e => {
    text += `${e.content}.`
  })

  const findSummary = async () => {
    try {
      setSummary(`Generating summary... Please wait... 😊`)
      await new Promise((res, rej) => setTimeout(res, 2000))

      const response = await axios.post(GET_SUMMARY_URL, {
        input: text
      })
      const summaryRes = response.data.summary
      setSummary(summaryRes)
    } catch (err) {
      setSummary(`Something went wrong! 😭 Are you sure that this isn't the meeting beginning? 🧐`)
    }
  }


  return (
    <div className='participants_section_container'>
      <ParticipantsLabel />
      <Participants />



      <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid white', marginBottom: '20px', textAlign: 'center' }}>
        <div style={{ height: '250px', fontSize: '12px', lineHeight: '15px', padding: '10px', borderRadius: '10px', margin: '10px', background: '#9aa0a6' }}>
          {summary}
        </div>
        <div onClick={findSummary} style={{ cursor: 'pointer', fontSize: '12px', width: '80%', margin: 'auto', marginBottom: '10px', padding: '4px 9px', background: '#86efac', borderRadius: '20px' }}>
          Summarize with <span style={{ color: '#be123c' }}>cohere</span>! 🤖
        </div>
      </div>
    </div>
  )
  // return (
  //   <div className='participants_section_container'>
  //     <ParticipantsLabel />
  //     <Participants />
  //     <DirectChat />
  //   </div>
  // )
}


const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps)(ParticipantsSection);

