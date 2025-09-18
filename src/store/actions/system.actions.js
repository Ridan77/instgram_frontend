import { store } from '../store'
import { OPEN_DIALOG, CLOSE_DIALOG, SET_NOTIFY, UNSET_NOTIFY } from '../reducers/system.reducer'

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
