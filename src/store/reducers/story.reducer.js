export const SET_STORIES = 'SET_STORIES'
export const SET_STORY = 'SET_STORY'
export const REMOVE_STORY = 'REMOVE_STORY'
export const ADD_STORY = 'ADD_STORY'
export const UPDATE_STORY = 'UPDATE_STORY'
export const ADD_STORY_COMMENT = 'ADD_STORY_COMMENT'
export const SET_FILTER = 'SET_FILTER'

const initialState = {
    stories: [],
    story: null,
    filterBy: null,
}

export function storyReducer(state = initialState, action) {
    let newState = state
    let stories
    switch (action.type) {
        case SET_STORIES:
            newState = { ...state, stories: action.stories }
            break
        case SET_STORY:
            newState = { ...state, story: action.story }
            break
        case REMOVE_STORY: {
            const lastRemovedStory = state.stories.find(story => story._id === action.storyId)
            stories = state.stories.filter(story => story._id !== action.storyId)
            newState = { ...state, stories, lastRemovedStory }
        } break
        case ADD_STORY:
            newState = { ...state, stories: [action.story, ...state.stories,] }
            break
        case UPDATE_STORY:
            stories = state.stories.map(story => (story._id === action.story._id) ? action.story : story)
            newState = { ...state, stories }
            break
        case ADD_STORY_COMMENT:
            if (action.comment && state.story) {
                newState = { ...state, story: { ...state.story, comments: [...state.story.comments || [], action.comment] } }
            }
            break
        case SET_FILTER:
            newState = { ...state, filterBy: action.filterBy }
            break
        default:
    }
    return newState
}

// unitTestReducer()

// function unitTestReducer() {
//     let state = initialState
//     const story1 = { _id: 'b101', vendor: 'Story ' + parseInt('' + Math.random() * 10), speed: 12, owner: null, msgs: [] }
//     const story2 = { _id: 'b102', vendor: 'Story ' + parseInt('' + Math.random() * 10), speed: 13, owner: null, msgs: [] }

//     state = storyReducer(state, { type: SET_STORIES, stories: [story1] })
//     console.log('After SET_STORIES:', state)

//     state = storyReducer(state, { type: ADD_STORY, story: story2 })
//     console.log('After ADD_STORY:', state)

//     state = storyReducer(state, { type: UPDATE_STORY, story: { ...story2, vendor: 'Good' } })
//     console.log('After UPDATE_STORY:', state)

//     state = storyReducer(state, { type: REMOVE_STORY, storyId: story2._id })
//     console.log('After REMOVE_STORY:', state)

//     state = storyReducer(state, { type: SET_STORY, story: story1 })
//     console.log('After SET_STORY:', state)


// }

