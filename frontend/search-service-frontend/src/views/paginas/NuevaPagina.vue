<template>
    <div class="container p-3">

        <Spinner v-if="loading" />
        
        <div class="row" v-if="!loading">
            <div class="col-md-6 col-sm-12">
                <h1>Nueva página</h1>

                <div class="alert alert-info" role="alert">
                    Podrás habilitar extractors después de registrar la página
                </div>

                <form @submit="sendPagina">
                    <div class="mb-3">
                        <label for="titulo" class="form-label">Título</label>
                        <input type="text" class="form-control" id="titulo" aria-describedby="emailHelp"
                            v-model="pagina.titulo" autofocus required>
                        <div id="tituloHelp" class="form-text">Un título que sirva para identificar esta página.</div>
                    </div>
                    <div class="mb-3">
                        <label for="url" class="form-label">URL</label>
                        <input type="url" class="form-control" id="url" aria-describedby="emailHelp" v-model="pagina.url"
                            required>
                        <div id="urlHelp" class="form-text">La URL tal cual la ves o copias del explorador</div>
                    </div>
                    <div class="mb-3">
                        <div class="col-2">
                            <label for="profundidad">Profundidad</label>
                            <input type="number" class="form-control" aria-describedby="profundidadHelp"
                                v-model="pagina.profundidad" id="profundidad" required>
                        </div>
                        <div id="profundidadHelp" class="form-text">La cantidad de sub-páginas que se registrarán por cada
                            ejecución</div>
                    </div>
                    <div class="mb-3">
                        <label>Frecuencia</label>
                        <div id="frecuenciaHelp" class="form-text">Cada cuánto se va a correr la búsqueda en esta
                            página</div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="cronRadioBtn"
                                checked @change="checkFrecuenciaType">
                            <label class="form-check-label" for="cronRadioBtn">
                                Expresión Cron
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="precargadasRadioBtn"
                                @change="checkFrecuenciaType">
                            <label class="form-check-label" for="precargadasRadioBtn">
                                Precargadas
                            </label>
                        </div>
                        <div id="cron-expression-fieldset" v-if="tipo_frecuencia == 'cron'">
                            <input id="cron-expression-input" required class="form-control"
                                aria-describedby="frecuenciaHelp" v-model="pagina.frecuencia" type="text" />
                            <div class="form-text">Debe ingresar una expresión Cron de <strong>6 campos</strong>. <a href="https://www.manpagez.com/man/5/crontab/" target="_blank">Ayuda</a>
                            </div>
                        </div>
                        <div id="precargadas-fieldset" v-if="tipo_frecuencia == 'precargadas'">
                            <select class="form-select" aria-label="Default select example" id="precargadas-input">
                                <option selected></option>
                                <option value="1">Cada 5 minutos</option>
                                <option value="2">Cada hora</option>
                                <option value="3">Cada 8 horas</option>
                                <option value="3">Cada 24 horas</option>
                            </select>
                            <div class="form-text">Seleccione una de las opciones de frecuencia
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <button type="submit" class="btn btn-primary">Guardar</button>
                    </div>
                </form>
            </div>
            <!-- <div class="col-md-6 d-none d-lg-block">

            </div> -->
        </div>
    </div>
</template>


<script>
import Spinner from '../../components/Spinner.vue'
import { useToastStore } from '../../stores/toast'

export default {
    name: 'NuevaPagina',
    components : {
        Spinner
    },
    data() {
        return {
            "pagina": {
                titulo: "",
                url: "",
                profundidad: 1,
                frecuencia: ""
            },
            tipo_frecuencia : 'cron',
            loading : false,
            toast : useToastStore()
        }
    },
    created() {

    },
    mounted() {
        document.getElementById('titulo').focus()
    },
    methods: {
        checkFrecuenciaType(){
            if(document.getElementById('cronRadioBtn').checked)
                this.tipo_frecuencia = "cron"

            if(document.getElementById('precargadasRadioBtn').checked)
                this.tipo_frecuencia = "precargadas"
        },
        sendPagina(e){
            e.preventDefault()
            if(this.tipo_frecuencia == 'cron')
                this.pagina.frecuencia = document.getElementById('cron-expression-input').value

            if(this.tipo_frecuencia == 'precargadas')
                this.pagina.frecuencia = document.getElementById('precargadas-input').value

            this.loading = true

            fetch(`${import.meta.env.VITE_APP_URL}:${import.meta.env.VITE_APP_PORT}/paginas`,
            {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(this.pagina)
            })
            .then(res => {
                if(res.ok){
                    this.toast.showToast('Éxito', "Página guardada con éxito", "bi bi-check-circle-fill")
                    this.$router.push('/paginas')
                }
            })
            .catch(err => {
                console.log('Error: ' + err)
            })
        }
    }
}
</script>