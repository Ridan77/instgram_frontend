const { DEV, VITE_LOCAL } = import.meta.env


import { storyService as local } from './story.service.local'
import { storyService as remote } from './story.service.remote'


function getDefaultFilter() {
    return {
        txt: '',
        sortField: '',
        sortDir: '',
        random: true,
    }
}

const service = (VITE_LOCAL === 'true') ? local : remote
export const storyService = {  getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.storyService = storyService
