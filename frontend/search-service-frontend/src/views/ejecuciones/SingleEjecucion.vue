<template>
    <Spinner v-if="this.loading" />

    <div v-if="!this.loading">
        <div class="card mb-3">
            <div class="card-body">
                <div class="mb-3">
                    <h1>Ejecución #{{ this.ejecucionId }}</h1>
                </div>
                <div class="mb-3">
                    <h3>Fecha</h3>
                    <p>{{ this.ejecucion.fecha }}</p>
                </div>
                <div class="mb-3">
                    <h3>Hora</h3>
                    <p>{{ this.ejecucion.hora }}</p>
                </div>
            </div>
        </div>

        <div v-if="!this.loading">
            <div
                class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Capturas</h1>
            </div>
            <div class="accordion" id="accordionCapturas">
                <div class="accordion-item" v-for="captura in this.capturas">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            :data-bs-target="'#accordionPannel-' + captura.id" aria-expanded="false"
                            :aria-controls="'#accordionPannel-' + captura.id">
                            {{ captura.nombre }} - {{ captura.url }}
                        </button>
                    </h2>
                    <div :id="'accordionPannel-' + captura.id" class="accordion-collapse collapse">
                        <div class="accordion-body">
                            {{ captura.contenido }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Spinner from '../../components/Spinner.vue';
import EjecucionService from '../../services/EjecucionService';

export default{
    name: 'SingleEjecucion',
    props: ['ejecucionId'],
    data() {
        return {
            capturas: [],
            loading : true,
            ejecucion : {
                id : "???",
                fecha : "???",
                hora : "???"
            }
        };
    },
    methods: {
        async setEjecucion(id) {
            let service = new EjecucionService();
            let ejecucionRes = await service.getCapturasByEjecucionId(id);
            this.capturas = await ejecucionRes.json();
            this.loading = false
        }
    },
    async mounted() {
        await this.setEjecucion(this.ejecucionId);
    },
    components: { Spinner }
}
</script>