export const localStorageMergeItem = (key, value) => {
    const item = localStorageGetItem(key)
    const newItem = { ...item, ...value }
    const stringValue = JSON.stringify(newItem)
    localStorage.setItem(key, stringValue);
}

/** только для объектов */
export const localStorageGetItem = (key) => {
    const item = localStorage.getItem(key)

    try {
        return JSON.parse(item)
    } catch (error) {
        console.error(error);
        return undefined
    }
}
