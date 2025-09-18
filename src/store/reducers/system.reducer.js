export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const OPEN_DIALOG = 'OPEN_DIALOG'
export const CLOSE_DIALOG = 'CLOSE_DIALOG'
export const SET_NOTIFY = 'SET_NOTIFY'
export const UNSET_NOTIFY = 'UNSET_NOTIFY'

const initialState = {
  isLoading: false,
  isDialogOpen: false,
  isNotify: false

}

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true }
    case LOADING_DONE:
      return { ...state, isLoading: false }
    case OPEN_DIALOG:
      return { ...state, isDialogOpen: true }
    case CLOSE_DIALOG:
      return { ...state, isDialogOpen: false }
    case SET_NOTIFY:
      return { ...state, isNotify: true }
    case UNSET_NOTIFY:
      return { ...state, isNotify: false }
    default: return state
  }
}
