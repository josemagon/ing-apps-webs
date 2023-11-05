import { defineStore } from 'pinia'

export const userAuthStore = defineStore('user', {
    state: () => ({ token: null, userData: null }),
    getters: {
        getToken: (state) => state.token,
        getUserData: (state) => state.userData,
        isAuthenticated: (state) => state.token != null
    },
    actions: {
        login(token, userObject) {
            this.token = token
            this.userData = userObject
        },
        logout(token, user) {
            this.token = null
            this.userData = null
        }
    }
})
