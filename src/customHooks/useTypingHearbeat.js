import { useRef } from "react"
import { socketService, USER_TYPING, USER_STOP_TYPING } from "../services/socket.service.js"

export function useTypingHeartbeat(user, interval = 1000, idleTimeout = 3000) {
    const intervalId = useRef(null)
    const idleTimer = useRef(null)

    function startTyping() {
        if (!user) return
        if (!intervalId.current) {
            //   socketService.emit(USER_TYPING, { sender: user.fullname, userId: user._id })
            console.log(`user is typing ${user.fullname}`)

            intervalId.current = setInterval(() => {
                // socketService.emit(USER_TYPING, { sender: user.fullname, userId: user._id })
                console.log(`user is typing ${user.fullname}`)

            }, interval)
        }

        clearTimeout(idleTimer.current)
        idleTimer.current = setTimeout(stopTyping, idleTimeout)
    }

    function stopTyping() {
        if (intervalId.current) {
            clearInterval(intervalId.current)
            intervalId.current = null
        }
        // socketService.emit(USER_STOP_TYPING, { userId: user?._id })
        console.log(`user stoped typing ${user.fullname}`)

    }

    return { startTyping, stopTyping }
}