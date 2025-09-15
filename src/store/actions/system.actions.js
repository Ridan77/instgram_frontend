import { store } from '../store'
import { OPEN_DIALOG, CLOSE_DIALOG } from '../reducers/system.reducer'

export async function openDialog() {

    try {
        store.dispatch({ type: OPEN_DIALOG })
    } catch (err) {
        console.log('Cannot open dialog', err)
        throw err
    }
}

export async function closeDialog() {
    try {
        store.dispatch({ type: CLOSE_DIALOG })
    } catch (err) {
        console.log('Cannot close dialog', err)
        throw err
    }
}