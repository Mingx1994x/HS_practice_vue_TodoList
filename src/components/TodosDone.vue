<script setup>
defineProps(['doneTodos', 'todosNum'])

const emits = defineEmits('update-todo', 'del-todo')
const delTodo = (id) => {
  emits('del-todo', id)
}
const updTodo = (id) => {
  emits('update-todo', id)
}
</script>

<template>
  <ul
    class="tab-pane list-unstyled fade p-3 py-md-4 ps-md-4 pe-md-3"
    id="done-tab-pane"
    role="tabpanel"
    aria-labelledby="done-tab"
    tabindex="0"
  >
    <div class="d-flex align-items-start" v-for="item in doneTodos" :key="item.id">
      <li
        class="form-check custom-checkbox listBorder-bottom flex-grow-1 d-flex ps-0 pb-3 mb-3"
        :class="{ isDone: item.status }"
      >
        <button
          v-if="!item.status"
          type="button"
          class="btn border-0 fs-5 pt-0"
          :id="item.id"
          @click="updTodo(item.id)"
        >
          <i class="bi bi-app"></i>
        </button>
        <button
          v-else
          type="button"
          class="btn border-0 fs-5 text-warning pt-0"
          :id="item.id"
          @click="updTodo(item.id)"
        >
          <i class="bi bi-check-lg"></i>
        </button>
        <label :for="item.id">{{ item.content }}</label>
        <button
          type="button"
          @click="delTodo(item.id)"
          class="btn-close d-md-none ms-auto"
        ></button>
      </li>
      <button
        type="button"
        @click="delTodo(item.id)"
        class="btn-close d-none d-md-block ms-auto"
      ></button>
    </div>
    <p class="py-2">{{ todosNum }}個已完成項目</p>
  </ul>
</template>
