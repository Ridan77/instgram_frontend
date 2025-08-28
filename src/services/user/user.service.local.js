import { storageService } from '../async-storage.service'
import { storyService } from '../story'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    saveLoggedinUser,
    addLikedUser,
    toggleFollow,
}

async function getUsers() {
    const users = await storageService.query('user')
    return users.map(user => {
        delete user.password
        return user
    })
}

async function getById(userId) {
    return await storageService.get('user', userId)
}

function remove(userId) {
    return storageService.remove('user', userId)
}

async function update(userToSave) {
    // const user = await storageService.get('user', userToSave._id)
    // const userToUpdate = {...user,...userToSave}
    const savedUser = await storageService.put('user', userToSave)

    // When admin updates other user's details, do not update loggedinUser
    // const loggedinUser = getLoggedinUser()
    // if (loggedinUser._id === user._id) saveLoggedinUser(user)

    return savedUser
}

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)

    if (user) return saveLoggedinUser(user)
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    userCred.likedStoryIds = []

    const user = await storageService.post('user', userCred)
    return saveLoggedinUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLoggedinUser(user) {
    user = {
        _id: user._id,
        fullname: user.fullname,
        imgUrl: user.imgUrl,
        score: user.score,
        isAdmin: user.isAdmin,
        likedStoryIds: user.likedStoryIds || [],
        following: user.following || [],
        followers: user.followers || [],
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

// To quickly create an admin user, uncomment the next line
// _createAdmin()
async function _createAdmin() {
    const user = {
        username: 'admin',
        password: 'admin',
        fullname: 'Mustafa Adminsky',
        imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
        score: 10000,
    }

    const newUser = await storageService.post('user', userCred)
    console.log('newUser: ', newUser)
}

async function addLikedUser(userId, storyId) {
    const user = await storageService.get('user', userId)
    var slikes
    try {
        if (!user.likedStoryIds) {
            user.likedStoryIds = [storyId]
            slikes = await storyService.addLikeStory(user, storyId)
        }
        else {
            if (user.likedStoryIds.includes(storyId)) {
                user.likedStoryIds = user.likedStoryIds.filter(itemId => itemId !== storyId)
                slikes = await storyService.addLikeStory(user, storyId)

            }
            else {
                user.likedStoryIds.push(storyId)
                slikes = await storyService.addLikeStory(user, storyId)
            }
        }
        await storageService.put('user', user)
        saveLoggedinUser(user)
        return { userLikes: user.likedStoryIds, storyLikes: slikes }
    }
    catch (err) {
        console.log('Cannot add liked story to user', err)
        throw err
    }
}

async function toggleFollow(userToFollowId) {
    try {
        const { _id } = getLoggedinUser()
        const user = await getById(_id)
        const userToFollow = await getById(userToFollowId)
        const miniUser = { _id: user._id, imgUrl: user.imgUrl, fullname: user.fullname }
        const miniUserToFollow = { _id: userToFollow._id, imgUrl: userToFollow.imgUrl, fullname: userToFollow.fullname }

        const isFollowing = user.following?.some(item => item._id === userToFollowId)
        let userToUpdate
        if (isFollowing) {
            userToUpdate = { ...user, following: user.following.filter(item => item._id !== userToFollowId) }
        } else {
            userToUpdate = { ...user, following: [...user.following || [], miniUserToFollow] }
        }
        let userToFollowToUpdate
        const isFollowed = userToFollow.followers?.some(item => item._id === user._id)
        if (isFollowed) {
            userToFollowToUpdate = {
                ...userToFollow, followers: userToFollow.followers.filter(item => item._id !== user._id)
            }
        } else {
            userToFollowToUpdate = { ...userToFollow, followers: [...userToFollow.followers || [], miniUser] }
        }
        const savedUser = await storageService.put('user', userToUpdate)
        const savedFollowUser = await storageService.put('user', userToFollowToUpdate)
        saveLoggedinUser(savedUser)

        return ({ savedUser, savedFollowUser })
    } catch (err) {
        console.log('Cannot add liked story to user', err)
        throw err
    }


}