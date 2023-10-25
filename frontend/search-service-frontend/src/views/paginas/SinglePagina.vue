<template>
    <Spinner v-if="loading" />

    <div v-if="!loading">
        <div class="card mb-3">
            <div class="card-img-top single-page-img-top" :style="`background-image: url('${pagina.imagen}');`"
                v-if="pagina.imagen"></div>
            <div class="card-body">
                <h5 class="card-title">{{ pagina.titulo }}</h5>
                <p class="card-text">{{ pagina.url }}</p>
                <p class="card-text"><small class="text-body-secondary">{{ (pagina.ultimaEjecucion) ? pagina.ultimaEjecucion
                    : "Sin ejecuciones recientes" }}</small></p>
                <button class="card-link simple-btn">Editar</button>
                <button class="card-link simple-btn eliminar-btn" data-bs-toggle="modal"
                    data-bs-target="#modal-confirm-eliminar-pagina">Eliminar</button>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 col-sm-12 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Document Extractor</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">Extractor de documento</h6>
                        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur molestias
                            iusto sed, sint voluptate, perferendis nisi ex nulla voluptatum velit asperiores rem tempore,
                            doloremque repudiandae consequatur aperiam quibusdam dicta ut?</p>
                        <button class="card-link btn simple-btn" data-bs-toggle="modal"
                            data-bs-target="#extractor-editor-Document">Editar</button>
                        <button class="card-link btn simple-btn">Resetear</button>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-sm-12">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Request Extractor</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">Extractor de solicitud</h6>
                        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur molestias
                            iusto sed, sint voluptate, perferendis nisi ex nulla voluptatum velit asperiores rem tempore,
                            doloremque repudiandae consequatur aperiam quibusdam dicta ut?</p>
                        <button class="card-link btn simple-btn" data-bs-toggle="modal"
                            data-bs-target="#extractor-editor-Request">Editar</button>
                        <button class="card-link btn simple-btn">Resetear</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <ExtractorEditorModal type="Document" :titulo="pagina.titulo" :paginaId="pagina.id" :content="pagina.document_extractor" v-if="!loading"/>
    <ExtractorEditorModal type="Request" :titulo="pagina.titulo" :paginaId="pagina.id" :content="pagina.request_extractor" v-if="!loading"/>
    <Confirm question="¿Desea eliminar esta página?" :yes="eliminarPagina" name="eliminar-pagina" />
</template>

<script>
import Spinner from '../../components/Spinner.vue';
import ExtractorEditorModal from './ExtractorEditorModal.vue';
import Confirm from '../../components/Confirm.vue';

export default {
    name: 'SinglePagina',
    props: [
        'id'
    ],
    data() {
        return {
            loading: true,
            pagina: {
                titulo: "Cargando...",
                url: "",
                ultimaEjecucion: null,
                imagen: null
            }
        }
    },
    created() {
        if (!this.id) {
            alert('Error.')
        }
    },
    mounted() {
        this.setPagina(this.id)
    },
    methods: {
        setPagina() {
            fetch(`${import.meta.env.VITE_APP_URL}:${import.meta.env.VITE_APP_PORT}/paginas/${this.id}`)
                .then(res => {
                    res.json().then(pagina => {
                        this.pagina = pagina
                        this.loading = false
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        },
        eliminarPagina() {
            this.loading = true
            fetch(`${import.meta.env.VITE_APP_URL}:${import.meta.env.VITE_APP_PORT}/paginas/${this.id}`,
                {
                    method: 'DELETE'
                })
                .then(res => {
                    if (res.ok)
                        this.$router.push('/paginas')
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    components: {
        Spinner,
        ExtractorEditorModal,
        Confirm
    }
}
</script>