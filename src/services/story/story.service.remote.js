import { httpService } from '../http.service'

export const storyService = {
    query,
    getById,
    save,
    remove,
    saveLike,
    addStoryComment,
    // addCarMsg
}

async function query(filterBy = { txt: '' }) {
    return httpService.get(`story`, filterBy)
}

function getById(storyId) {
    return httpService.get(`story/${storyId}`)
}

async function remove(storyId) {
    return httpService.delete(`story/${storyId}`)
}
async function save(story) {
    var savedStory
    if (story._id) {
        savedStory = await httpService.put(`story/${story._id}`, story)
    } else {
        savedStory = await httpService.post('story', story)
    }
    return savedStory
}

async function saveLike(story) {
    var savedStory
    savedStory = await httpService.post(`story/like/${story._id}`)
    return savedStory
}

async function addStoryComment(storyId, txt) {
    return httpService.post(`story/comment/${storyId}`, { txt })



}
// async function addCarMsg(storyId, txt) {
//     const savedMsg = await httpService.post(`story/${storyId}/msg`, {txt})
//     return savedMsg
// }