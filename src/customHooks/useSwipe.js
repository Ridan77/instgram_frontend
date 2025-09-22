import { useEffect } from "react"

export function useSwipe(ref, { onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown }) {
  useEffect(() => {
    const element = ref.current
    if (!element) return

    let touchStartX = 0
    let touchStartY = 0
    let touchEndX = 0
    let touchEndY = 0
    const threshold = 50 

    function handleTouchStart(e) {
      touchStartX = e.changedTouches[0].screenX
      touchStartY = e.changedTouches[0].screenY
    }

    function handleTouchEnd(e) {
      touchEndX = e.changedTouches[0].screenX
      touchEndY = e.changedTouches[0].screenY
      handleGesture()
    }

    function handleGesture() {
      const dx = touchEndX - touchStartX
      const dy = touchEndY - touchStartY

      if (Math.abs(dx) > Math.abs(dy)) {
        // horizontal swipe
        if (dx > threshold && onSwipeRight) onSwipeRight()
        if (dx < -threshold && onSwipeLeft) onSwipeLeft()
      } else {
        // vertical swipe
        if (dy > threshold && onSwipeDown) onSwipeDown()
        if (dy < -threshold && onSwipeUp) onSwipeUp()
      }
    }

    element.addEventListener("touchstart", handleTouchStart, false)
    element.addEventListener("touchend", handleTouchEnd, false)

    return () => {
      element.removeEventListener("touchstart", handleTouchStart)
      element.removeEventListener("touchend", handleTouchEnd)
    }
  }, [ref, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown])
}
