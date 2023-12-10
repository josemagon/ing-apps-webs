import { userAuthStore } from "../stores/userAuth";

export default class CapturaService {
    baseURL = `${import.meta.env.VITE_APP_URL}:${import.meta.env.VITE_APP_PORT}/ejecucions`

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

    async getById(id){
        return await fetch(`${this.baseURL}/${id}`, {
            headers : this.headers
        })
    }

    async getCapturasByEjecucionId(ejecucionId){
        return await fetch(`${this.baseURL}/${ejecucionId}/capturas`, {
            headers : this.headers
        })
    }
}