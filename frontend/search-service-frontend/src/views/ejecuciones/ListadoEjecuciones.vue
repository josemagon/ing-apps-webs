<script setup>
import { onMounted } from 'vue';
import Spinner from '../../components/Spinner.vue';
import PaginaService from '../../services/PaginaService';

const props = defineProps(['paginaId'])

let ejecuciones = []
let loaded = false
let pagina = null

const setPagina = async (id) => {
    const paginaService = new PaginaService()
    const res = await paginaService.getPagina(this.id)
    const ejecucionesRes = await paginaService.getEjecucionsForPagina(this.id)
    if(res.ok){
        pagina = await res.json()
        pagina.ejecuciones = await ejecucionesRes.json()
        ejecuciones = pagina.ejecuciones
        loaded = true
    }
}

onMounted(async () => {
    await setPagina(props.paginaId)
})
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
                            <RouterLink :to="'/ejecucion/' + ejecucion.id">{{ ejecucion.id }}</RouterLink>
                        </td>
                        <td>
                            <RouterLink :to="'/ejecucion/' + ejecucion.id">{{ ejecucion.fecha }}</RouterLink>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

</div></template>