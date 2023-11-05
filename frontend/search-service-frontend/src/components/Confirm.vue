<template>
  <div class="modal" tabindex="-1" :id="`modal-confirm-${name}`">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <p>{{ question }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" @click="yes" data-bs-dismiss="modal">Aceptar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Confirm',
  props: [
    'name',
    'question',
    'yes',
    'no'
  ]
}
</script>