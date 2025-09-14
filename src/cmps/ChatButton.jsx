import React, { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import {
  socketService,
  SOCKET_EMIT_SEND_MSG,
  SOCKET_EVENT_ADD_MSG,
  SOCKET_EMIT_SET_TOPIC,
} from "../services/socket.service"

import { svg } from "./Svgs"

export function ChatButton() {
  const [msg, setMsg] = useState({ txt: "" })
  const [msgs, setMsgs] = useState([])
  const [topic, setTopic] = useState("general")
  const user = useSelector((storeState) => storeState.userModule.user)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const dialog = useRef()

  useEffect(() => {
    socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
    socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)

    return () => {
      socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
    }
  }, [])
  function addMsg(newMsg) {
    setMsgs((prevMsgs) => [...prevMsgs, newMsg])
  }

  function onSendMessage(ev) {
    ev.preventDefault()
    if (!msg.txt) return
    socketService.emit(SOCKET_EMIT_SEND_MSG, msg)
    setMsg({ txt: "" })
  }

  function openDialog(ev) {
    dialog.current.show()
    setIsDialogOpen(true)
  }
  function closeDialog(ev) {
    dialog.current.close()
    setIsDialogOpen(false)
  }
  function handleChange(ev) {
    const value = ev.target.value
    setMsg({ from: user.fullname, txt: value })
  }
  function expandDialog(ev) {
    console.log("expanding")
  }
  console.log("msg", msg)
  return (
    <section className="chat">
      {!isDialogOpen && (
        <button onClick={openDialog} className="chat-open-btn">
          {svg.chat}
          <span>Messages</span>
        </button>
      )}

      <dialog ref={dialog} className="dialog">
        <section className="dialog-container">
          <div className="chat-header">
            <span>Messages</span>
            <div >
              <button onClick={expandDialog}>{svg.expand}</button>
              <button className="chat-close-btn" onClick={closeDialog}>
                {svg.close1}
              </button>
            </div>
          </div>
          <ul>
            {msgs.map((msg, idx) => {
              return <li key={idx}>{`${msg.from}: ${msg.txt}`}</li>
            })}
          </ul>
          <form onSubmit={onSendMessage}>
            {svg.smily2}
            <input
              className="chat-input"
              placeholder="Send message..."
              type="txt"
              name="txt"
              id=""
              value={msg.txt}
              onChange={handleChange}
              autoComplete="off"
            />
            <div className="actions">
              {!msg.txt && (
                <div className="attach-btns">
                  <span>{svg.voice}</span>
                  <span>{svg.sticker}</span>
                  <span>{svg.photo}</span>
                </div>
              )}
              {msg.txt && <button>{svg.arrowFull}</button>}
            </div>
          </form>
        </section>
      </dialog>
    </section>
  )
}
