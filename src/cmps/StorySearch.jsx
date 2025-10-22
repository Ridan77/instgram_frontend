import { useEffect, useRef, useState } from "react"
import { SET_FILTER } from "../store/reducers/story.reducer"
import { store } from "../store/store"
import { debounce } from "../services/util.service"

export function StorySearch() {
  const [filterToEdit, setFilterToEdit] = useState("")
  const onDebounceFilter = useRef(debounce(onSetFilterBy, 3000)).current

  useEffect(() => {
    onDebounceFilter(filterToEdit)
  }, [filterToEdit])

  function onSetFilterBy(value) {
    store.dispatch({ type: SET_FILTER, filterBy: value })
  }
  function handleChange(ev) {
    let value = ev.target.value
    setFilterToEdit(value)
  }
  return (
    <section className="story-search">
      <p>Search</p>
      <input
        type="text"
        name="txt"
        value={filterToEdit}
        placeholder="Search"
        onChange={handleChange}
        required
      />
    </section>
  )
}
