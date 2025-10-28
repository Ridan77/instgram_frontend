import { storyService } from '../../services/story'
import { store } from '../store'
import { ADD_STORY, REMOVE_STORY, SET_STORIES, SET_STORY, UPDATE_STORY, ADD_STORY_COMMENT } from '../reducers/story.reducer'
import { showErrorMsg } from '../../services/event-bus.service'
import { SET_USER } from '../reducers/user.reducer'
import { userService } from '../../services/user'

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
        showErrorMsg("Cannot remove story&&&&&")

        throw err
    }
}


export async function removeStory(storyId) {
    try {
        await storyService.remove(storyId)
        store.dispatch(getCmdRemoveStory(storyId))
    } catch (err) {
        console.log('Cannot remove story!!!!', err.response.data)
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
        store.dispatch(getCmdSetStory(savedStory))
        return savedStory
    } catch (err) {
        console.log('Cannot save story', err)
        throw err
    }
}

export async function toggleLikeStory(story) {
    try {
        const savedStory = await storyService.saveLike(story)
        store.dispatch(getCmdSetStory(savedStory))
        // return savedStory
    } catch (err) {
        console.log('Cannot save story', err)
        throw err
    }
}

export async function addStoryComment(storyId, txt) {
    try {
        const savedComment = await storyService.addStoryComment(storyId, txt)
        store.dispatch(getCmdAddStoryComment(savedComment))
        return savedComment
    } catch (err) {
        console.log('Cannot add story msg', err)
        throw err
    }
}



export async function optimisticToggleLike(story) {
    const user = store.getState().userModule.user
    if (!user) return
    const isLiked = story.likedBy.some(u => u._id === user._id)
    const optimisticStory = {
        ...story,
        likedBy: isLiked
            ? story.likedBy.filter(u => u._id !== user._id)
            : [...story.likedBy, { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl }]
    }
    const optimisticUser = {
        ...user,
        likedStoryIds: isLiked
            ? user.likedStoryIds.filter(storyId => storyId !== story._id)
            : [...user.likedStoryIds, story._id]
    }
    store.dispatch(getCmdSetStory(optimisticStory))
    store.dispatch(getCmdUpdateStory(optimisticStory))
    store.dispatch({ type: SET_USER, user: optimisticUser })
    
    try {
        const savedStory = await storyService.saveLike(story)
        const savedUser = await userService.updateLike(story._id)
        store.dispatch(getCmdSetStory(savedStory))
        store.dispatch(getCmdUpdateStory(savedStory))
        store.dispatch({ type: SET_USER, user: savedUser })
    } catch (err) {
        console.log("Cannot toggle like", err)
        store.dispatch(getCmdSetStory(story))
        store.dispatch(getCmdUpdateStory(story))
        store.dispatch({ type: SET_USER, user })
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
        type: UPDATE_STORY,
        story
    }
}
function getCmdAddStoryComment(comment) {
    return {
        type: ADD_STORY_COMMENT,
        comment
    }
}

// unitTestActions()
async function unitTestActions() {
    await loadStories()
    // await addStory(storyService.getEmptyStory())
    await updateStory({
        _id: 'm1oC7',
        vendor: 'Story-Good',
    })
    await removeStory('m1oC7')
    // TODO unit test addStoryMsg
}
