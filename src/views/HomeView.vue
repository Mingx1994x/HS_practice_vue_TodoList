<script setup>
import TheWelcome from '@/components/TheWelcome.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="bg-warning d-flex align-items-lg-center">
    <div class="container-lg">
      <div class="py-5 py-md-0">
        <div class="row d-flex flex-column flex-md-row">
          <div class="col-md-6 d-flex align-items-center">
            <TheWelcome></TheWelcome>
          </div>
          <div class="col-md-6 d-flex flex-column justify-content-center">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
