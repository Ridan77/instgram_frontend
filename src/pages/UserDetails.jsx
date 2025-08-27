import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { loadUser } from '../store/actions/user.actions'
import { loadStories } from '../store/actions/story.actions'
import { store } from '../store/store'
import { showSuccessMsg } from '../services/event-bus.service'
import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from '../services/socket.service'
import { svg } from '../cmps/Svgs'

export function UserDetails() {

  const params = useParams()
  const user = useSelector(storeState => storeState.userModule.watchedUser)
  const stories = useSelector(storeState => storeState.storyModule.stories)

  useEffect(() => {
    loadUser(params.id)
    loadStories({userId:params.id})
    
    

    socketService.emit(SOCKET_EMIT_USER_WATCH, params.id)
    socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

    return () => {
      socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
    }

  }, [params.id])

  function onUserUpdate(user) {
    showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
    store.dispatch({ type: 'SET_WATCHED_USER', user })
  }
console.log(stories);
if (!user) return <div>Wait</div>
  return (
    <section className="user-details">
      <section className='user-header'>
        <img src={user.imgUrl} alt="" />
        <span>{user.fullname}</span>
        <button>Follow</button>
        <span>{svg.more}</span>
        <span>{`${stories?.length} Posts`}</span>
        <span>{`${user.followers} Followers`}</span>
        <span>{`${user.following} Following`}</span>
        <span>{user.bio}</span>
      </section>
    </section>
  )
}