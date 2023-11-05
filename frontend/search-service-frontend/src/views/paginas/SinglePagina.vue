<template>
    <Spinner v-if="loading" />

    <div v-if="!loading">
        <div class="card mb-3">
            <div class="card-img-top single-page-img-top" :style="`background-image: url('${pagina.imagen}');`"
                v-if="pagina.imagen"></div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="titulo">Título</label>
                    <input type="text" name="titulo" id="titulo" v-model="pagina.titulo" class="form-control"
                        :disabled="!editing">
                </div>
                <div class="mb-3">
                    <label for="url">URL</label>
                    <input type="url" name="url" id="url" v-model="pagina.url" class="form-control" :disabled="!editing">
                </div>
                <p class="card-text"><small class="text-body-secondary">{{ (pagina.ultimaEjecucion) ? pagina.ultimaEjecucion
                    : "Sin ejecuciones recientes" }}</small></p>
                <button class="card-link simple-btn" @click="() => { editing = true }" v-if="!editing">Editar</button>
                <div v-if="editing" class="mb-3">
                    <button class="card-link simple-btn" @click="() => { editing = false }">Cancelar</button>
                    <button class="card-link btn btn-outline-success" @click="editPagina">Guardar</button>
                </div>
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
            <div class="col-md-6 col-sm-12 mb-3">
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

        <div class="alert alert-danger" role="alert">
            <strong>Eliminar esta página</strong>
            <p>Las ejecuciones se detendrán y también serán eliminadas</p>
            <button class="btn btn-danger" data-bs-toggle="modal"
                data-bs-target="#modal-confirm-eliminar-pagina">Eliminar</button>
        </div>
    </div>

    <ExtractorEditorModal type="Document" :titulo="pagina.titulo" :paginaId="pagina.id" :content="pagina.document_extractor"
        v-if="!loading" />
    <ExtractorEditorModal type="Request" :titulo="pagina.titulo" :paginaId="pagina.id" :content="pagina.request_extractor"
        v-if="!loading" />
    <Confirm question="¿Desea eliminar esta página?" :yes="eliminarPagina" name="eliminar-pagina" />
</template>

<script>
import Spinner from '../../components/Spinner.vue';
import ExtractorEditorModal from './ExtractorEditorModal.vue';
import Confirm from '../../components/Confirm.vue';
import { useToastStore } from '../../stores/toast';

export default {
    name: 'SinglePagina',
    props: [
        'id'
    ],
    data() {
        return {
            loading: true,
            editing: false,
            pagina: {
                titulo: "Cargando...",
                url: "",
                ultimaEjecucion: null,
                imagen: null
            },
            toast : useToastStore()
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
                    if (res.ok){
                        this.toast.showToast('Éxito', 'Página eliminada')
                        this.$router.push('/paginas')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        editPagina() {
            this.loading = true
            let newPagina = {
                "titulo": this.pagina.titulo,
                "url": this.pagina.url
            }
            fetch(`${import.meta.env.VITE_APP_URL}:${import.meta.env.VITE_APP_PORT}/paginas/${this.id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newPagina)
                })
                .then(res => {
                    this.loading = false
                    this.editing = false
                    this.toast.showToast('OK', 'Página editada')
                    this.$router.push(`/paginas/${this.pagina.id}`)
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