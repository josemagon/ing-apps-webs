import { userAuthStore } from "../stores/userAuth";

export default class CapturaService {
    baseURL = `${import.meta.env.VITE_APP_URL}:${import.meta.env.VITE_APP_PORT}/capturas`

    headers = {
        'Content-Type': 'application/json'
    }

    constructor() {
        const user = userAuthStore()
        if (user.isAuthenticated) {
            const token = user.getToken
            if (token)
                this.headers['Authorization'] = `Bearer ${token}`
        }
    }

    async search(query){
        // let encodedFilter = encodeURIComponent(`{"where": {"contenido": {"like" : ${query}}}}`)
        let encodedFilter = `%7B%0A%20%20%20%20%22where%22%20%3A%20%7B%0A%20%20%20%20%20%20%20%20%22contenido%22%20%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22regexp%22%3A%20%22%2F${query}%2Fi%22%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%7D`
        // console.log("Shooting at " , `${this.baseURL}?filter=${encodedFilter}`)
        return await fetch(`${this.baseURL}?filter=${encodedFilter}`, {
            headers : this.headers
        })
    }
}