<script>
import Spinner from '../../components/Spinner.vue'
import { RouterLink } from 'vue-router'

export default {
    data() {
        return {
            paginas: null,
            loaded: false,
            error: false
        };
    },
    created() {
        console.log(import.meta.env.VITE_APP_URL);
        this.getListadoPaginas()
    },
    methods: {
        getListadoPaginas() {
            fetch(`${import.meta.env.VITE_APP_URL}:${import.meta.env.VITE_APP_PORT}/paginas`)
                .then(res => {
                    res.json().then(
                        json => {
                            this.paginas = json
                            this.loaded = true
                        })
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },
    components: { Spinner, RouterLink }
}
</script>

<template>
    <Spinner v-if="!loaded" />
    <div v-if="loaded">
        <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Páginas</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
                <div class="btn-group me-2">
                    <RouterLink to="/nueva-pagina" class="btn btn-sm btn-outline-secondary">
                        Nueva
                        <i class="bi bi-plus-circle"></i>
                    </RouterLink>
                </div>
            </div>
        </div>
        <div class="table-responsive small">
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Título</th>
                        <th scope="col">URL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="pagina in  paginas">
                        <td>{{ pagina.id }}</td>
                        <td>{{ pagina.titulo }}</td>
                        <td>{{ pagina.url }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

</div></template>