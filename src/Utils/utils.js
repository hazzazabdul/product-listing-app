export const getDataFromLocalStorage = () => {
    const data = localStorage.getItem("products")
    return JSON.parse(data) || [];
}