<script setup>
import { RouterView } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'
import TopHeader from './components/TopHeader.vue'
import SideBar from './components/SideBar.vue';
import Toast from './components/Toast.vue';

import './assets/bootstrap-5.3.2-dist/css/bootstrap.min.css'
// import './assets/css/bootstrap-icons/bootstrap-icons.min.css'
import './assets/css/css@3.css'
import './assets/css/dashboard.css'
import './assets/css/search-service.css'
import BackButton from './components/BackButton.vue';
import './assets/bootstrap-5.3.2-dist/js/bootstrap.bundle'
import LogIn from './views/LogIn.vue';
import { userAuthStore } from './stores/userAuth';
import { onMounted } from 'vue';

const { isAuthenticated } = useAuth0()
const { user } = useAuth0()
const { getAccessTokenSilently, logout } = useAuth0()
const userStore = userAuthStore()

async function setUserAuthStore() {
  if (isAuthenticated) {
    const token = await getAccessTokenSilently()
    userStore.login(token, user.value)
  } else {
    console.log('logging out because I am not authenticated')
    userStore.logout()
    logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    })
  }


}

onMounted(() => setUserAuthStore())

</script>

<template>
  <div v-if="!isAuthenticated" class="d-flex align-items-center py-4 bg-body-tertiary" style="height: 100%">
    <LogIn />
  </div>
  <div v-if="isAuthenticated">
    <TopHeader />

    <div class="container-fluid">
      <div class="row">
        <SideBar />
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 pt-2">
          <BackButton />
          <RouterView />
        </main>
      </div>
    </div>

  </div>
  <Toast />
</template>

<style>
html {
  height: 100%;
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.b-example-divider {
  width: 100%;
  height: 3rem;
  background-color: rgba(0, 0, 0, .1);
  border: solid rgba(0, 0, 0, .15);
  border-width: 1px 0;
  box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
}

.b-example-vr {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
}

.bi {
  vertical-align: -.125em;
  fill: currentColor;
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.btn-bd-primary {
  --bd-violet-bg: #712cf9;
  --bd-violet-rgb: 112.520718, 44.062154, 249.437846;

  --bs-btn-font-weight: 600;
  --bs-btn-color: var(--bs-white);
  --bs-btn-bg: var(--bd-violet-bg);
  --bs-btn-border-color: var(--bd-violet-bg);
  --bs-btn-hover-color: var(--bs-white);
  --bs-btn-hover-bg: #6528e0;
  --bs-btn-hover-border-color: #6528e0;
  --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
  --bs-btn-active-color: var(--bs-btn-hover-color);
  --bs-btn-active-bg: #5a23c8;
  --bs-btn-active-border-color: #5a23c8;
}

.bd-mode-toggle {
  z-index: 1500;
}

.bd-mode-toggle .dropdown-menu .active .bi {
  display: block !important;
}
</style>