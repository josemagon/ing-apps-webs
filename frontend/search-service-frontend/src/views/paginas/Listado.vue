<script>
import Spinner from '../../components/Spinner.vue'
import { RouterLink } from 'vue-router'
import PaginaService from '../../services/PaginaService';

export default {
    data() {
        return {
            paginas: null,
            loaded: false,
            error: false
        };
    },
    created() {
        this.getListadoPaginas()
    },
    methods: {
        async getListadoPaginas() {
            const paginaService = new PaginaService()
            const res = await paginaService.getPaginas()
            if(res.ok){
                this.paginas = res.json()
                this.loaded = true
            }
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
                    <RouterLink to="/nueva-pagina" class="btn simple-btn">
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
                            <td><RouterLink :to="'/paginas/' + pagina.id ">{{ pagina.id }}</RouterLink></td>
                            <td><RouterLink :to="'/paginas/' + pagina.id ">{{ pagina.titulo }}</RouterLink></td>
                            <td>{{ pagina.url }}</td>
                        </tr>
                </tbody>
            </table>
        </div>

</div></template>