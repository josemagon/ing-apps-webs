<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
        <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu"
            aria-labelledby="sidebarMenuLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="sidebarMenuLabel">Menú</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu"
                    aria-label="Close"></button>
            </div>
            <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <RouterLink class="nav-link d-flex align-items-center gap-2" aria-current="page" to="/">
                            <svg class="bi">
                                <use xlink:href="#house-fill" />
                            </svg>
                            Inicio
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link d-flex align-items-center gap-2" aria-current="page" to="/paginas">
                            <svg class="bi">
                                <use xlink:href="#house-fill" />
                            </svg>
                            Páginas
                        </RouterLink>
                    </li>
                </ul>
                <hr class="my-3">

                <ul class="nav flex-column mb-auto">
                    <li class="nav-item">
                        <a class="nav-link d-flex align-items-center gap-2" href="#">
                            <svg class="bi">
                                <use xlink:href="#gear-wide-connected" />
                            </svg>
                            Configuraciones
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link d-flex align-items-center gap-2" href="#">
                            <svg class="bi">
                                <use xlink:href="#door-closed" />
                            </svg>
                            Salir
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-power" viewBox="0 0 16 16">
                                <path d="M7.5 1v7h1V1h-1z" />
                                <path
                                    d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
</div></template>