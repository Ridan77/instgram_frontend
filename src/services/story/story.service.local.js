
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'story'

export const storyService = {
    query,
    getById,
    save,
    remove,
    addStoryMsg
}
window.ss = storyService

_createStrories()

async function query(filterBy = { txt: '' }) {
    var stories = await storageService.query(STORAGE_KEY)
    const { txt, sortField, sortDir } = filterBy
    
    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        stories = stories.filter(story => regex.test(story.txt) || regex.test(story.description))
    }
    if (sortField === 'txt') {
        stories.sort((story1, story2) =>
            story1[sortField].localeCompare(story2[sortField]) * +sortDir)
    }
    
    
    // stories = stories.map(({ _id, txt, owner }) => ({ _id, txt, owner }))
    return Promise.resolve(stories)
}

function getById(storyId) {
    return storageService.get(STORAGE_KEY, storyId)
}

async function remove(storyId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, storyId)
}

async function save(story) {
    var savedStory
    if (story._id) {
        const storyToSave = {
            _id: story._id,
            speed: story.speed
        }
        savedStory = await storageService.put(STORAGE_KEY, storyToSave)
    } else {
        const storyToSave = {
            txt: story.txt,
            speed: story.speed,
            // Later, owner is set by the backend
            owner: userService.getLoggedinUser(),
            msgs: []
        }
        savedStory = await storageService.post(STORAGE_KEY, storyToSave)
    }
    return savedStory
}

async function addStoryMsg(storyId, txt) {
    // Later, this is all done by the backend
    const story = await getById(storyId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    story.msgs.push(msg)
    await storageService.put(STORAGE_KEY, story)

    return msg
}

async function _createStrories() {
    let stories = await storageService.query(STORAGE_KEY) 
    if (!stories || !stories.length) {
        stories = _mockData()
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stories))
    }
}

function _mockData() {

    return [{
        _id: 's101',
        txt: 'Best trip ever',
        imgUrl: 'https://picsum.photos/seed/pic1/400/400',
        by: {
            _id: 'u101',
            fullname: 'Ulash Ulashi',
            imgUrl: 'http://some-img',
        },
        loc: {
            // Optional
            lat: 11.11,
            lng: 22.22,
            name: 'Tel Aviv',
        },
        comments: [
            {
                id: 'c1001',
                by: {
                    _id: 'u105',
                    fullname: 'Bob',
                    imgUrl: 'http://some-img',
                },
                txt: 'good one!',
                likedBy: [  // Optional
                    {
                        _id: 'u105',
                        fullname: 'Bob',
                        imgUrl: 'http://some-img',
                    },
                ],
            },
            {
                id: 'c1002',
                by: {
                    _id: 'u106',
                    fullname: 'Dob',
                    imgUrl: 'http://some-img',
                },
                txt: 'not good!',
            },
        ],
        likedBy: [
            {
                _id: 'u105',
                fullname: 'Bob',
                imgUrl: 'http://some-img',
            },
            {
                _id: 'u106',
                fullname: 'Dob',
                imgUrl: 'http://some-img',
            },
        ],
        tags: ['fun', 'romantic'],
    },
    {
        _id: 's102',
        txt: 'Sunset at the beach 🌅',
        imgUrl: 'https://picsum.photos/seed/pic2/400/400',
        by: {
            _id: 'u102',
            fullname: 'Mona Lisa',
            imgUrl: 'http://some-img',
        },
        loc: {
            lat: 34.05,
            lng: -118.25,
            name: 'Los Angeles',
        },
        comments: [
            {
                id: 'c2001',
                by: {
                    _id: 'u107',
                    fullname: 'Alice',
                    imgUrl: 'http://some-img',
                },
                txt: 'wow amazing!',
            },
            {
                id: 'c2002',
                by: {
                    _id: 'u108',
                    fullname: 'John',
                    imgUrl: 'http://some-img',
                },
                txt: 'wish I was there!',
                likedBy: [
                    {
                        _id: 'u109',
                        fullname: 'Sara',
                        imgUrl: 'http://some-img',
                    },
                ],
            },
        ],
        likedBy: [
            {
                _id: 'u107',
                fullname: 'Alice',
                imgUrl: 'http://some-img',
            },
            {
                _id: 'u108',
                fullname: 'John',
                imgUrl: 'http://some-img',
            },
        ],
        tags: ['sunset', 'beach', 'relax'],
    },
    {
        _id: 's103',
        txt: 'Hiking the mountains 🏔️',
        imgUrl: 'https://picsum.photos/seed/pic3/400/400',
        by: {
            _id: 'u103',
            fullname: 'Chris Pine',
            imgUrl: 'http://some-img',
        },
        loc: {
            lat: 46.88,
            lng: 9.57,
            name: 'Swiss Alps',
        },
        comments: [
            {
                id: 'c3001',
                by: {
                    _id: 'u110',
                    fullname: 'Emma',
                    imgUrl: 'http://some-img',
                },
                txt: 'looks cold but beautiful!',
            },
            {
                id: 'c3002',
                by: {
                    _id: 'u111',
                    fullname: 'Tom',
                    imgUrl: 'http://some-img',
                },
                txt: 'on my bucket list!',
            },
        ],
        likedBy: [
            {
                _id: 'u110',
                fullname: 'Emma',
                imgUrl: 'http://some-img',
            },
            {
                _id: 'u111',
                fullname: 'Tom',
                imgUrl: 'http://some-img',
            },
        ],
        tags: ['hiking', 'nature', 'adventure'],
    }
    ]
}
