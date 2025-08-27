
import { storageService } from '../async-storage.service'
import { makeId, makeLorem } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'story'

export const storyService = {
    query,
    getById,
    save,
    remove,
    addStoryComment,
    addLikeStory
}
window.ss = storyService

_createStrories()

async function query(filterBy = { txt: '' }) {
    var stories = await storageService.query(STORAGE_KEY)
    const { txt, sortField, sortDir, userId } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        stories = stories.filter(story => regex.test(story.txt) || regex.test(story.description))
    }
    if (userId) {
        stories = stories.filter(story => story.by._id === userId)
    }
    if (sortField === 'txt') {
        stories.sort((story1, story2) =>
            story1[sortField].localeCompare(story2[sortField]) * +sortDir)
    }
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

        savedStory = await storageService.put(STORAGE_KEY, story)
    } else {
        const storyToSave = { ...story, likedBy: [], comments: [], createdAt: Date.now() }
        savedStory = await storageService.post(STORAGE_KEY, storyToSave)
        console.log('story from ssave service', savedStory);
    }
    return savedStory
}

async function addStoryComment(storyId, txt) {
    // Later, this is all done by the backend
    const story = await getById(storyId)
    const { _id, imgUrl, fullname } = userService.getLoggedinUser()
    const comment = {
        id: makeId(),
        by: { _id, imgUrl, fullname },
        txt
    }
    story.comments.push(comment)
    await storageService.put(STORAGE_KEY, story)
    return comment
}

async function addLikeStory(user, storyId) {
    const miniUser = {
        _id: user._id,
        fullname: user.fullname,
        imgUrl: user.imgUrl
    }
    const story = await getById(storyId)
    if (story.likedBy) {
        const alreadyLiked = story.likedBy.some(item => item._id === user._id)

        if (alreadyLiked) {
            story.likedBy = story.likedBy.filter(item => item._id !== user._id)
        } else {
            story.likedBy.push(miniUser)
        }
    } else {
        story.likedBy = [miniUser]
    }
    console.log('story.likedBy', story.likedBy);
    await storageService.put(STORAGE_KEY, story)
    return story.likedBy

}




async function _createStrories() {
    let stories = await storageService.query(STORAGE_KEY)
    if (!stories || !stories.length) {
        stories = _mockData()
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stories))
    }
}

makeLorem

function _mockData() {
    return [
        {
            _id: 's101',
            txt: 'Best trip ever, , Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean convallis nibh eu dignissim condimentum. Vestibulum quam augue, tristique ac semper ac, molestie a ligula. Praesent blandit, neque nec consequat consequat, urna neque maximus felis, in condimentum arcu ligula at purus. Ut ac risus a mi tempus ultricies. Praesent varius pretium lectus vel venenatis. Fusce et maximus dolor. Aliquam aliquam, massa non lobortis ornare, sem nibh cursus purus, ac dignissim massa eros nec erat. Nullam nec ligula libero. Phasellus ullamcorper malesuada nisl ac iaculis.',
            imgUrl: 'https://picsum.photos/seed/pic1/460/400',
            by: {
                _id: 'u101',
                fullname: 'Ulash Ulashi',
                imgUrl: 'https://picsum.photos/seed/pic1/100/100',
            },
            loc: {
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
                        imgUrl: 'https://picsum.photos/seed/person3/100/100',
                    },
                    txt: 'good one!',
                    likedBy: [
                        {
                            _id: 'u105',
                            fullname: 'Bob',
                            imgUrl: 'https://picsum.photos/seed/person4/100/100',
                        },
                    ],
                },
                {
                    id: 'c1002',
                    by: {
                        _id: 'u106',
                        fullname: 'Dob',
                        imgUrl: 'https://picsum.photos/seed/person5/100/100',
                    },
                    txt: 'not good!',
                },
            ],
            likedBy: [
                { _id: 'u105', fullname: 'Bob', imgUrl: 'http://some-img' },
                { _id: 'u106', fullname: 'Dob', imgUrl: 'http://some-img' },
            ],
            tags: ['fun', 'romantic'],
        },
        {
            _id: 's102',
            txt: 'Sunset at the beach 🌅',
            imgUrl: 'https://picsum.photos/seed/pic2/460/400',
            by: {
                _id: 'u102',
                fullname: 'Mona Lisa',
                imgUrl: 'https://picsum.photos/seed/pic2/100/100',
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
                        imgUrl: 'https://picsum.photos/seed/person7/100/100',
                    },
                    txt: 'wow amazing!',
                },
                {
                    id: 'c2002',
                    by: {
                        _id: 'u108',
                        fullname: 'John',
                        imgUrl: 'https://picsum.photos/seed/person8/100/100',
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
                { _id: 'u107', fullname: 'Alice', imgUrl: 'http://some-img' },
                { _id: 'u108', fullname: 'John', imgUrl: 'http://some-img' },
            ],
            tags: ['sunset', 'beach', 'relax'],
        },
        {
            _id: 's103',
            txt: 'Hiking the mountains 🏔️',
            imgUrl: 'https://picsum.photos/seed/pic3/460/400',
            by: {
                _id: 'u103',
                fullname: 'Chris Pine',
                imgUrl: 'https://picsum.photos/seed/pic3/100/100',
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
                        imgUrl: 'https://picsum.photos/seed/person1/100/100',
                    },
                    txt: 'looks cold but beautiful!',
                },
                {
                    id: 'c3002',
                    by: {
                        _id: 'u111',
                        fullname: 'Tom',
                        imgUrl: 'https://picsum.photos/seed/person2/100/100',
                    },
                    txt: 'on my bucket list!',
                },
            ],
            likedBy: [
                { _id: 'u110', fullname: 'Emma', imgUrl: 'http://some-img' },
                { _id: 'u111', fullname: 'Tom', imgUrl: 'http://some-img' },
            ],
            tags: ['hiking', 'nature', 'adventure'],
        },
        {
            _id: 's104',
            txt: 'Coffee time in Paris ☕',
            imgUrl: 'https://picsum.photos/seed/pic4/460/400',
            by: {
                _id: 'u104',
                fullname: 'Sophie Turner',
                imgUrl: 'https://picsum.photos/seed/pic4/100/100',
            },
            loc: { lat: 48.85, lng: 2.35, name: 'Paris' },
            comments: [
                {
                    id: 'c4001',
                    by: {
                        _id: 'u112',
                        fullname: 'Liam',
                        imgUrl: 'https://picsum.photos/seed/person6/100/100',
                    },
                    txt: 'so chic!',
                },
            ],
            likedBy: [{ _id: 'u112', fullname: 'Liam', imgUrl: 'http://some-img' }],
            tags: ['coffee', 'city', 'travel'],
        },
        {
            _id: 's105',
            txt: 'Cycling through Amsterdam 🚲',
            imgUrl: 'https://picsum.photos/seed/pic5/460/400',
            by: {
                _id: 'u105',
                fullname: 'Mark Johnson',
                imgUrl: 'https://picsum.photos/seed/pic5/100/100',
            },
            loc: { lat: 52.37, lng: 4.89, name: 'Amsterdam' },
            comments: [
                {
                    id: 'c5001',
                    by: {
                        _id: 'u113',
                        fullname: 'Nina',
                        imgUrl: 'https://picsum.photos/seed/person9/100/100',
                    },
                    txt: 'love the canals!',
                },
            ],
            likedBy: [{ _id: 'u113', fullname: 'Nina', imgUrl: 'http://some-img' }],
            tags: ['cycling', 'city', 'europe'],
        },
        {
            _id: 's106',
            txt: 'Camping under the stars ✨',
            imgUrl: 'https://picsum.photos/seed/pic6/460/400',
            by: {
                _id: 'u106',
                fullname: 'Jack Daniels',
                imgUrl: 'https://picsum.photos/seed/pic6/100/100',
            },
            loc: { lat: 40.71, lng: -74.01, name: 'New York' },
            comments: [
                {
                    id: 'c6001',
                    by: {
                        _id: 'u114',
                        fullname: 'Sophia',
                        imgUrl: 'https://picsum.photos/seed/person10/100/100',
                    },
                    txt: 'dreamy night!',
                },
            ],
            likedBy: [{ _id: 'u114', fullname: 'Sophia', imgUrl: 'http://some-img' }],
            tags: ['camping', 'stars', 'outdoors'],
        },
        {
            _id: 's107',
            txt: 'Street food in Bangkok 🍜',
            imgUrl: 'https://picsum.photos/seed/pic7/460/400',
            by: {
                _id: 'u107',
                fullname: 'Lara Croft',
                imgUrl: 'https://picsum.photos/seed/pic7/100/100',
            },
            loc: { lat: 13.75, lng: 100.5, name: 'Bangkok' },
            comments: [
                {
                    id: 'c7001',
                    by: {
                        _id: 'u115',
                        fullname: 'Ben',
                        imgUrl: 'https://picsum.photos/seed/person11/100/100',
                    },
                    txt: 'yummy!',
                },
            ],
            likedBy: [{ _id: 'u115', fullname: 'Ben', imgUrl: 'http://some-img' }],
            tags: ['food', 'asia', 'street'],
        },
        {
            _id: 's108',
            txt: 'Snowboarding adventure 🏂',
            imgUrl: 'https://picsum.photos/seed/pic8/460/400',
            by: {
                _id: 'u108',
                fullname: 'Tony Stark',
                imgUrl: 'https://picsum.photos/seed/pic8/100/100',
            },
            loc: { lat: 39.19, lng: -106.82, name: 'Aspen' },
            comments: [
                {
                    id: 'c8001',
                    by: {
                        _id: 'u116',
                        fullname: 'Ella',
                        imgUrl: 'https://picsum.photos/seed/person12/100/100',
                    },
                    txt: 'so cool!',
                },
            ],
            likedBy: [{ _id: 'u116', fullname: 'Ella', imgUrl: 'http://some-img' }],
            tags: ['snow', 'sports', 'winter'],
        },
        {
            _id: 's109',
            txt: 'Boat ride in Venice 🚤',
            imgUrl: 'https://picsum.photos/seed/pic9/460/400',
            by: {
                _id: 'u109',
                fullname: 'Marco Polo',
                imgUrl: 'https://picsum.photos/seed/pic9/100/100',
            },
            loc: { lat: 45.44, lng: 12.33, name: 'Venice' },
            comments: [
                {
                    id: 'c9001',
                    by: {
                        _id: 'u117',
                        fullname: 'Olivia',
                        imgUrl: 'https://picsum.photos/seed/person13/100/100',
                    },
                    txt: 'romantic!',
                },
            ],
            likedBy: [{ _id: 'u117', fullname: 'Olivia', imgUrl: 'http://some-img' }],
            tags: ['boat', 'italy', 'romantic'],
        },
        {
            _id: 's110',
            txt: 'Festival vibes 🎶',
            imgUrl: 'https://picsum.photos/seed/pic10/460/400',
            by: {
                _id: 'u110',
                fullname: 'David Bowie',
                imgUrl: 'https://picsum.photos/seed/pic10/100/100',
            },
            loc: { lat: 51.51, lng: -0.13, name: 'London' },
            comments: [
                {
                    id: 'c10001',
                    by: {
                        _id: 'u118',
                        fullname: 'George',
                        imgUrl: 'https://picsum.photos/seed/person14/100/100',
                    },
                    txt: 'great energy!',
                },
            ],
            likedBy: [{ _id: 'u118', fullname: 'George', imgUrl: 'http://some-img' }],
            tags: ['music', 'festival', 'friends'],
        },
    ]
}


