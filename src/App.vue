<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <RouterLink to="/"> Login </RouterLink>| <RouterLink to="/todoList"> todoList </RouterLink>|
  </header>
  <RouterView />
</template>
