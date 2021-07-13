const useLocalStorage = () => {
  const getLocalItem = (key, defaultValue) =>
    JSON.parse(localStorage.getItem(key)) || defaultValue

  const removeLocalItem = (key) => localStorage.removeItem(key)

  const setLocalItem = (key, value) =>
    localStorage.setItem(key, JSON.stringify(value))

  return { getLocalItem, removeLocalItem, setLocalItem }
}

export default useLocalStorage
