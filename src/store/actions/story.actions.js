import { storyService } from '../../services/story'
import { toggleLikeUser } from './user.actions'
import { store } from '../store'
import { ADD_STORY, REMOVE_STORY, SET_STORIES, SET_STORY, UPDATE_STORY, ADD_STORY_COMMENT } from '../reducers/story.reducer'

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
        store.dispatch(getCmdUpdateStory(savedStory))
        return savedStory
    } catch (err) {
        console.log('Cannot save story', err)
        throw err
    }
}

export async function toggleLikeStory(story) {
    try {
        const savedStory = await storyService.saveLike(story)
        store.dispatch(getCmdUpdateStory(savedStory))
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


export async function toggleLike(story) {
    try {
        const user = store.getState().userModule.user
        if (!user) return
        await toggleLikeStory(story)
        await toggleLikeUser(story._id)
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
