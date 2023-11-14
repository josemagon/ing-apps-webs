<template>
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
            <main class="px-3">
                <h1>Buscar</h1>
                <p class="lead">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde tempore, dignissimos facilis reprehenderit minus voluptatum quos a odio vero pariatur qui enim provident cum aliquam magnam blanditiis vel quisquam doloremque.</p>
                <div class="mb-3">
                    <form @submit="buscar">
                        <input type="text" placeholder="Buscar término" class="btn btn-lg btn-light fw-bold border-white bg-white" autofocus v-model="terminoBusqueda">
                    </form>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import CapturaService from '../services/CapturaService';

let terminoBusqueda = ''
const buscar = async (evt) => {
    evt.preventDefault()

    if(!terminoBusqueda || terminoBusqueda == '')
        return false

    let capturaService = new CapturaService()
    let results = await (await capturaService.search(terminoBusqueda)).json()
    console.log(results)
}
</script>