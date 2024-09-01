<script setup>
import TodoNone from '@/components/TodoNone.vue'
import TodosAll from '@/components/TodosAll.vue'
import TodosDone from '@/components/TodosDone.vue'
import TodosUndone from '@/components/TodosUndone.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const HexAPI = 'https://todolist-api.hexschool.io'
const token = ref('')
const errResponse = ref('')
const router = useRouter()
// checkout
const userData = ref('')
const isCheckout = ref('')
onMounted(async () => {
  try {
    token.value = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    const res = await axios.get(`${HexAPI}/users/checkout`, {
      headers: {
        authorization: token.value
      }
    })
    // console.log(res)
    userData.value = res.data
    isCheckout.value = true
    readTodos()
  } catch (error) {
    // console.log(error)
    alert('還沒有登入唷')
    router.push('/')
  }
})

// read todo
const isGet = ref(true)
const todos = ref('')
const undoneTodos = ref('')
const doneTodos = ref('')
const todosNum = ref({
  all: '',
  undone: '',
  done: ''
})

const readTodos = async () => {
  try {
    const res = await axios.get(`${HexAPI}/todos`, {
      headers: {
        authorization: token.value
      }
    })
    // console.log(res)
    todos.value = res.data.data
    // const datas = res.data.data
    // todos.value = datas.map((data) => ({
    //   ...data,
    //   isEditing: false
    // }))
    undoneTodos.value = todos.value.filter((item) => item.status == false)
    doneTodos.value = todos.value.filter((item) => item.status == true)
    todosNum.value.all = todos.value.length
    todosNum.value.undone = undoneTodos.value.length
    todosNum.value.done = doneTodos.value.length
    // console.log(todos.value)
    // console.log(isGet.value)
    // console.log(todosNum.value.undone)

    if (todosNum.value.all !== 0) isGet.value = false
    else isGet.value = true
  } catch (error) {
    // console.log(error)
    errResponse.value = error.response.data.message
  }
}

// logout
const isLogout = ref(true)
// const logoutMsg = ref('')
const logout = async (userId) => {
  try {
    await axios.post(`${HexAPI}/users/sign_out`, userId, {
      headers: {
        authorization: token.value
      }
    })
    // console.log(res)
    // logoutMsg.value = res.data.message
    document.cookie = 'userToken=null'
    isLogout.value = true
    router.push('/')
  } catch (error) {
    // console.log(error)
    isLogout.value = false
    errResponse.value = error.response.data.message
  }
}

// addTodo
const newTodo = ref('')
const addMsg = ref('')
const isAdd = ref(false)
const addTodo = async () => {
  try {
    // console.log(newTodo.value)
    if (!newTodo.value) {
      alert(`${userData.value.nickname}，您尚未輸入代辦事項唷`)
      return
    }

    const data = {
      content: ''
    }
    data.content = newTodo.value
    const res = await axios.post(`${HexAPI}/todos`, data, {
      headers: {
        authorization: token.value
      }
    })
    // console.log(res)
    addMsg.value = res.data
    isAdd.value = true
    newTodo.value = ''
    readTodos()
  } catch (error) {
    // console.log(error)
    errResponse.value = error.response.data.message
  }
}

// delete todo
const deleteTodo = async (todoId) => {
  // console.log('updateTodo:' + todoId)
  // console.log(`${HexAPI}/todos/${todoId}`)
  // console.log(token.value)
  try {
    await axios.delete(`${HexAPI}/todos/${todoId}`, {
      headers: {
        authorization: token.value
      }
    })
    // console.log(res)
    readTodos()
  } catch (error) {
    // console.log(error)
    errResponse.value = error.response.data.message
  }
}

// update todo
const updateTodo = async (todoId) => {
  // console.log('updateTodo:' + todoId)
  // console.log(`${HexAPI}/todos/${todoId}/toggle`)
  // console.log(token.value)

  try {
    await axios.patch(
      `${HexAPI}/todos/${todoId}/toggle`,
      {},
      {
        headers: {
          authorization: token.value
        }
      }
    )
    // console.log(res)
    readTodos()
  } catch (error) {
    // console.log(error)
    errResponse.value = error.response.data.message
  }
}
</script>
<template>
  <div class="main bg-linear-warning-light px-c2-1 pt-3">
    <div class="container-lg">
      <header class="mb-3 mb-md-c4-3">
        <div class="row d-flex align-items-center">
          <div class="col-md-4 col-8">
            <img alt="totoList logo" class="img-fluid" src="@/assets/images/logo.png" />
          </div>
          <div class="col-md-8 col-4">
            <div class="d-flex align-items-center">
              <p class="fw-bold d-none d-md-block ms-auto" v-show="isCheckout">
                {{ userData.nickname }}的代辦
              </p>
              <a
                href="#"
                class="text-decoration-none rounded-3 ms-auto ms-md-3 p-2"
                @click.prevent="logout(userData.uid)"
              >
                登出
              </a>
            </div>
          </div>
        </div>
      </header>
      <div class="row d-flex justify-content-center">
        <div class="col-md-6">
          <div class="input-group bg-light border border-0 p-2 rounded-3 mb-3">
            <input
              type="text"
              class="form-control border-0 bg-transparent"
              placeholder="新增代辦事項"
              aria-label="add todo list"
              aria-describedby="button-add"
              v-model="newTodo"
            />
            <button
              class="btn btn-dark rounded-3 fs-5 fw-bold"
              type="button"
              id="button-add"
              @click="addTodo"
            >
              <i class="bi bi-plus-lg"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="row d-flex justify-content-center" v-if="isGet">
        <div class="col-md-4">
          <TodoNone />
        </div>
      </div>
      <div class="row d-flex justify-content-center" v-else>
        <div class="col-md-6">
          <div class="list-card-shadow bg-light rounded-3">
            <ul class="nav nav-underline" role="tablist">
              <div class="row gx-0 w-100">
                <div class="col-4">
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link active w-100"
                      id="allList-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#allList-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="allList-tab-pane"
                      aria-selected="true"
                    >
                      全部
                    </button>
                  </li>
                </div>
                <div class="col-4">
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link w-100"
                      id="undone-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#undone-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="undone-tab-pane"
                      aria-selected="false"
                    >
                      待完成
                    </button>
                  </li>
                </div>
                <div class="col-4">
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link w-100"
                      id="done-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#done-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="done-tab-pane"
                      aria-selected="false"
                    >
                      已完成
                    </button>
                  </li>
                </div>
              </div>
            </ul>
            <div class="tab-content" id="ListTabContent">
              <!-- ALL List -->
              <TodosAll
                :todos="todos"
                :todosNum="todosNum.undone"
                @del-todo="deleteTodo"
                @update-todo="updateTodo"
              />

              <!-- undone List -->
              <TodosUndone
                :undoneTodos="undoneTodos"
                :todosNum="todosNum.undone"
                @update-todo="updateTodo"
                @del-todo="deleteTodo"
              />

              <!-- done List -->
              <TodosDone
                :doneTodos="doneTodos"
                :todosNum="todosNum.done"
                @update-todo="updateTodo"
                @del-todo="deleteTodo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
