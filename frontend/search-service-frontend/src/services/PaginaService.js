import { userAuthStore } from "../stores/userAuth";

export default class PaginaService {
    baseURL = `${import.meta.env.VITE_APP_URL}:${import.meta.env.VITE_APP_PORT}/paginas`

    headers = {
        'Content-Type': 'application/json'
    }

    constructor() {
        const user = userAuthStore()

        if (user.isAuthenticated) {
            const token = user.token
            if (token)
                this.headers['Authorization'] = `Bearer ${token}`
        }
    }

    async addNewPagina(pagina) {
        return await fetch(this.baseURL,
            {
                body: JSON.stringify(pagina),
                method: 'POST',
                headers: this.headers
            })
    }

    async deletePagina(pagina) {
        return await fetch(`${this.baseURL}/${pagina}`,
            {
                method: 'DELETE',
                headers: this.headers
            })
    }

    async editPagina(id, pagina) {
        return await fetch(`${this.baseURL}/${id}`,
            {
                method: 'PATCH',
                headers: this.headers,
                body : JSON.stringify(pagina)
            })
    }
}