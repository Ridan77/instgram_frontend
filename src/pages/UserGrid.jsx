import { useOutletContext } from "react-router-dom"
import { Gallery } from "../cmps/Gallery"

export function UserGrid() {
  const { stories } = useOutletContext()
  return <Gallery stories={stories} />
}