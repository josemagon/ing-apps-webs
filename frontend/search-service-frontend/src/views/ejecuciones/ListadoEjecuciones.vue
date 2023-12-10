<script>
import Spinner from '../../components/Spinner.vue';
import PaginaService from '../../services/PaginaService';
import { RouterLink } from 'vue-router'

export default{
    name: 'ListadoEjecuciones',
    props: ['paginaId'],
    data() {
        return {
            ejecuciones: [],
            loaded: false,
            pagina: null
        };
    },
    methods: {
        async setPagina(id) {
            const paginaService = new PaginaService();
            const res = await paginaService.getPagina(id);
            const ejecucionesRes = await paginaService.getEjecucionsForPagina(id);
            if (res.ok) {
                this.pagina = await res.json();
                this.pagina.ejecuciones = await ejecucionesRes.json();
                this.ejecuciones = this.pagina.ejecuciones;
                this.loaded = true;
            }
        }
    },
    async mounted() {
        await this.setPagina(this.paginaId);
    },
    components: { Spinner }
}
</script>

<template>
    <Spinner v-if="!loaded" />

    <div v-if="loaded">
        <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Ejecuciones en {{ pagina.titulo }}</h1>
        </div>
        <div class="table-responsive small">
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Fecha</th>
                    </tr>
                </thead>
                <tbody>

                    <tr v-for="ejecucion in  ejecuciones">
                        <td>
                            <RouterLink :to="'/ejecuciones/' + ejecucion.id">{{ ejecucion.id }}</RouterLink>
                        </td>
                        <td>
                            <RouterLink :to="'/ejecuciones/' + ejecucion.id">{{ ejecucion.fecha }}</RouterLink>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>