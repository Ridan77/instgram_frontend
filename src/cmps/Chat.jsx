import React, { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import {
  socketService,
  SOCKET_EMIT_SEND_MSG,
  SOCKET_EVENT_ADD_MSG,
  SOCKET_EMIT_SET_TOPIC,
  USER_TYPING,
  USER_STOP_TYPING,
} from "../services/socket.service.js"

import { svg } from "./Svgs.jsx"
import { debounce } from "../services/util.service.js"
import {
  openDialog,
  closeDialog,
  notify,
} from "../store/actions/system.actions.js"
import EmojiPicker from "emoji-picker-react"

export function Chat() {
  const [msg, setMsg] = useState({ txt: "" })
  const [msgs, setMsgs] = useState([])
  const [topic, setTopic] = useState("general")
  const user = useSelector((storeState) => storeState.userModule.user)
  const [whoIsTyping, setWhoIsTyping] = useState(null)
  const isDialogOpen = useSelector(
    (storeState) => storeState.systemModule.isDialogOpen
  )
  const isNotify = useSelector((storeState) => storeState.systemModule.isNotify)
  const isOpenDialogOnNewMessageRef = useRef(false)
  const dialog = useRef()
  const onStopTypingDebounce = useRef(debounce(onStopTyping, 3000)).current
  const [showPicker, setShowPicker] = useState(false)

  useEffect(() => {
    socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
    socketService.emit(SOCKET_EMIT_SET_TOPIC, { topic, userId: user?._id })
    socketService.on(USER_TYPING, (msg) => {
      setWhoIsTyping(msg)
    })
    socketService.on(USER_STOP_TYPING, (msg) => {
      setWhoIsTyping(null)
    })
      function handleKeyDown(e) {
      if (e.key === "Escape") {
        setShowPicker(false)
      }
    }
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
      socketService.off(USER_TYPING)
      socketService.off(USER_STOP_TYPING)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])
  function addMsg(newMsg) {
    setMsgs((prevMsgs) => [...prevMsgs, newMsg])

    if (!isDialogOpen) {
      if (isOpenDialogOnNewMessageRef.current) {
        openDialog()
      } else {
        notify()
      }
    }
  }

  function onSendMessage(ev) {
    ev.preventDefault()
    if (!msg.txt) return
    socketService.emit(SOCKET_EMIT_SEND_MSG, msg)
    setMsg({ txt: "" })
    socketService.emit(USER_STOP_TYPING, {})
    setWhoIsTyping(null)
  }

  function handleChange(ev) {
    const value = ev.target.value
    setMsg({ from: user.fullname, txt: value })
    socketService.emit(USER_TYPING, { sender: user.fullname })
    onStopTypingDebounce()
  }

  function onStopTyping() {
    socketService.emit(USER_STOP_TYPING, {})
    setWhoIsTyping(null)
  }
  function expandDialog(ev) {
    console.log("expanding")
  }
  if (dialog.current) {
    if (isDialogOpen) dialog.current.show()
    else dialog.current.close()
  }
  function onEmojiClick(emojiData) {
    setMsg({...msg,txt:msg.txt +emojiData.emoji})
    setShowPicker(false)
  }
  function changeNotifyMethod(ev) {
    isOpenDialogOnNewMessageRef.current = ev.target.checked
  }
  return (
    <section className="chat">
      {!isDialogOpen && (
        <button onClick={openDialog} className="chat-open-btn">
          {isNotify ? svg.msgAlert : svg.chat}
          <span className="chat-open-title">Messages</span>
        </button>
      )}

      <dialog ref={dialog} className="dialog">
        <section className="dialog-container">
          <div className="chat-header">
            <span>Messages</span>
            <div className="chat-btns">
              <label title="Open chat on new message" className="switch">
                <input
                  onChange={(ev) => changeNotifyMethod(ev)}
                  type="checkbox"
                />
                <span className="slider"></span>
              </label>
              <button onClick={expandDialog}>{svg.expand}</button>
              <button className="chat-close-btn" onClick={closeDialog}>
                {svg.close1}
              </button>
            </div>
          </div>
          <div className="chat-container">
            <ul>
              {msgs.map((msg, idx) => {
                return (
                  <li
                    key={idx}
                    className={msg.from === user.fullname ? "me" : "other"}>{`${
                    msg.from === user.fullname ? "" : msg.from + ":"
                  } ${msg.txt}`}</li>
                )
              })}
            </ul>
          </div>
          {whoIsTyping?.sender && (
            <p
              className="who-is-typing"
              style={{ opacity: whoIsTyping.sender ? "1" : "0" }}>
              {`${whoIsTyping.sender} is typing`}
            </p>
          )}
          <form onSubmit={onSendMessage}>
            <button type="button" onClick={() => setShowPicker(!showPicker)}>
              {svg.smily2}
            </button>
            {showPicker && (
              <div  className="emoji-picker">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}

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
