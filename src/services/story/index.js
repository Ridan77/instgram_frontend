const { DEV, VITE_LOCAL } = import.meta.env

import { userService } from '../user'
import { getRandomIntInclusive, makeId } from '../util.service'

import { storyService as local } from './story.service.local'
import { storyService as remote } from './story.service.remote'

// function getEmptyStory() {
//     const {_id, fullname, imgUrl }=userService.getLoggedinUser()
// 	return {
//       by: {_id, fullname, imgUrl }
// 	}
// }

function getDefaultFilter() {
    return {
        txt: '',
        sortField: '',
        sortDir: '',
    }
}

const service = (VITE_LOCAL === 'true') ? local : remote
export const storyService = {  getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.storyService = storyService
