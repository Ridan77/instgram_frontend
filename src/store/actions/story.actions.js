import { storyService } from '../../services/story'
import{updateUser} from './user.actions'
import { store } from '../store'
import { ADD_STORY, REMOVE_STORY, SET_STORIES, SET_STORY, UPDATE_STORY, ADD_STORY_MSG } from '../reducers/story.reducer'

export async function loadStories(filterBy) {
    try {
        const stories = await storyService.query(filterBy)
            ; store.dispatch(getCmdSetStories(stories))
    } catch (err) {
        console.log('Cannot load stories', err)
        throw err
    }
}

export async function loadStory(storyId) {
    try {
        const story = await storyService.getById(storyId)
        store.dispatch(getCmdSetStory(story))
    } catch (err) {
        console.log('Cannot load story', err)
        throw err
    }
}


export async function removeStory(storyId) {
    try {
        await storyService.remove(storyId)
        store.dispatch(getCmdRemoveStory(storyId))
    } catch (err) {
        console.log('Cannot remove story', err)
        throw err
    }
}

export async function addStory(story) {
    try {
        const savedStory = await storyService.save(story)
        store.dispatch(getCmdAddStory(savedStory))
        return savedStory
    } catch (err) {
        console.log('Cannot add story', err)
        throw err
    }
}

export async function updateStory(story) {
    try {
        const savedStory = await storyService.save(story)
        // console.log('savedStory', savedStory);
        store.dispatch(getCmdUpdateStory(savedStory))
        return savedStory
    } catch (err) {
        console.log('Cannot save story', err)
        throw err
    }
}

export async function addStoryComment(storyId, txt) {
    try {
        const msg = await storyService.addStoryMsg(storyId, txt)
        store.dispatch(getCmdAddStoryMsg(msg))
        return msg
    } catch (err) {
        console.log('Cannot add story msg', err)
        throw err
    }
}

// export async function addLike(userId, storyId) {
//     try {
//         const likes = await userService.addLikedUser(userId, storyId);
//         console.log('likes from action', likes);
//         return Promise.resolve(likes)
//     } catch (err) {
//         console.log('Cannot add story msg', err)
//         throw err
//     }
// }

export async function toggleLikeStory(story) {
  try {
    const user = store.getState().userModule.user
    if (!user) return

    // --- toggle on the story ---
    const storyToSave = { ...story }
    const isLiked = storyToSave.likedBy.some((item) => item._id === user._id)
    // console.log('user was',isLiked,'in story')
    const { _id, imgUrl, fullname } = user
    
    storyToSave.likedBy = isLiked
    ? storyToSave.likedBy.filter((like) => like._id !== user._id)
    : [...storyToSave.likedBy, { _id, imgUrl, fullname }]
    await updateStory(storyToSave)
    
    // --- toggle on the user ---
    const userToSave = { ...user }
    const isUserLiked = userToSave.likedStoryIds.some((id) => id === story._id)
    // console.log('story was',isUserLiked,'in user')

    userToSave.likedStoryIds = isUserLiked
      ? userToSave.likedStoryIds.filter((id) => id !== story._id)
      : [...user.likedStoryIds, story._id]

    await updateUser(userToSave)

  } catch (err) {
    console.log("Cannot toggle like", err)
    throw err
  }
}




// Command Creators:
function getCmdSetStories(stories) {
    return {
        type: SET_STORIES,
        stories
    }
}
function getCmdSetStory(story) {
    return {
        type: SET_STORY,
        story
    }
}
function getCmdRemoveStory(storyId) {
    return {
        type: REMOVE_STORY,
        storyId
    }
}
function getCmdAddStory(story) {
    return {
        type: ADD_STORY,
        story
    }
}
function getCmdUpdateStory(story) {
    return {
        type: SET_STORY,
        story
    }
}
function getCmdAddStoryMsg(msg) {
    return {
        type: ADD_STORY_MSG,
        msg
    }
}

// unitTestActions()
async function unitTestActions() {
    await loadStories()
    await addStory(storyService.getEmptyStory())
    await updateStory({
        _id: 'm1oC7',
        vendor: 'Story-Good',
    })
    await removeStory('m1oC7')
    // TODO unit test addStoryMsg
}
