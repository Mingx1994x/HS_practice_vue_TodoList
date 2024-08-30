<script setup>
import TheWelcome from '@/components/TheWelcome.vue'
import { RouterView } from 'vue-router'

// const HexAPI = 'https://todolist-api.hexschool.io'
// const token = ref('')
</script>

<template>
  <main class="bg-warning">
    <div class="container-lg">
      <div class="row d-flex flex-column flex-md-row">
        <div class="col-md-6 d-flex align-items-center">
          <TheWelcome></TheWelcome>
        </div>
        <div class="col-md-6 d-flex flex-column justify-content-center">
          <RouterView />
        </div>
      </div>
    </div>
  </main>
</template>
