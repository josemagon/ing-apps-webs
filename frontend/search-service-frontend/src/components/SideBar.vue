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
                        <i class="bi bi-power"></i>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div></template>