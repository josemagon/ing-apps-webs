<template>
    <div class="toast-container position-fixed top-0 end-0 p-3">
        <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto"><i :class="`icon ${icon}`"></i> {{ title }}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                {{ msg }}
            </div>
        </div>
    </div>
</template>

<script>
    import { useToastStore } from '../stores/toast';

    export default {
        name : 'Toast',
        data(){
            return {
                toast : useToastStore()
            }
        },
        created(){

        },
        computed: {
            title(){
                return this.toast.title
            },
            msg(){
                return this.toast.msg
            },
            icon(){
                return this.toast.icon
            }
        }
    }
</script>