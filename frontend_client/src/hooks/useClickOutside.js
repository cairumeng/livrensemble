import { useEffect, useRef } from 'react'

const useClickOutside = ({ clickHandler }) => {
  const nodeRef = useRef()

  useEffect(() => {
    const listener = (event) => {
      event.stopPropagation()
      if (!nodeRef.current.contains(event.target)) {
        clickHandler()
      }
    }
    document.addEventListener('mousedown', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [])

  return nodeRef
}

export default useClickOutside
