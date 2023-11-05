import { defineStore } from "pinia";

export const useToastStore = defineStore('toast', {
    state : () => {
        return {
            title : '',
            msg : '',
            icon : 'bi bi-exclamation-circle-fill'
        }
    },
    actions : {
        showToast(title, msg, icon){
            this.title = title
            this.msg = msg
            
            if(icon != '' && icon)
                this.icon = icon

            const listToastElement= document.getElementById('liveToast')
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(listToastElement)
            toastBootstrap.show()
        }
    }
})