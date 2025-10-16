import { store } from '../store'
import { OPEN_DIALOG, CLOSE_DIALOG, SET_NOTIFY, UNSET_NOTIFY, OPEN_SEARCH, CLOSE_SEARCH } from '../reducers/system.reducer'

export function openDialog() {
    store.dispatch({ type: OPEN_DIALOG })
    store.dispatch({ type: UNSET_NOTIFY })

}

export function closeDialog() {
    store.dispatch({ type: CLOSE_DIALOG })
}

export function notify() {
    store.dispatch({ type: SET_NOTIFY })
}

export function openSearch() {
    console.log('opening search');
    store.dispatch({ type: OPEN_SEARCH })
}

export function closeSearch() {
    console.log('closing search');
    store.dispatch({ type: CLOSE_SEARCH })
}