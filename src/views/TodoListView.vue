<script setup>
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
    console.log(error)
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
    console.log(error)
    // errResponse.value.read = error.response.data.message
  }
}

// logout
const isLogout = ref(true)
// const logoutMsg = ref('')
const logout = async (userId) => {
  try {
    const res = await axios.post(`${HexAPI}/users/sign_out`, userId, {
      headers: {
        authorization: token.value
      }
    })
    console.log(res)
    // logoutMsg.value = res.data.message
    document.cookie = 'userToken=null'
    isLogout.value = true
    router.push('/')
  } catch (error) {
    console.log(error)
    isLogout.value = false
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
    console.log(error)
    errResponse.value.add = error.response.data.message
  }
}

// delete todo
const deleteTodo = async (todoId) => {
  // console.log('updateTodo:' + todoId)
  // console.log(`${HexAPI}/todos/${todoId}`)
  // console.log(token.value)
  try {
    const res = await axios.delete(`${HexAPI}/todos/${todoId}`, {
      headers: {
        authorization: token.value
      }
    })
    console.log(res)
    readTodos()
  } catch (error) {
    console.log(error)
  }
}

// update todo
const updateTodo = async (todoId) => {
  // console.log('updateTodo:' + todoId)
  // console.log(`${HexAPI}/todos/${todoId}/toggle`)
  // console.log(token.value)

  try {
    const res = await axios.patch(
      `${HexAPI}/todos/${todoId}/toggle`,
      {},
      {
        headers: {
          authorization: token.value
        }
      }
    )
    console.log(res)
    readTodos()
  } catch (error) {
    console.log(error)
  }
}
</script>
<template>
  <div class="bg-linear-warning-light px-c2-1 pt-3" style="min-height: 670px">
    <div class="container-lg">
      <header class="mb-3 mb-md-c4-3">
        <div class="row d-flex align-items-center">
          <div class="col-md-4 col-8">
            <img alt="totoList logo" class="img-fluid" src="@/assets/images/logo.png" />
          </div>
          <div class="col-md-8 col-4">
            <div class="d-flex">
              <p class="fw-bold d-none d-md-block ms-auto" v-show="isCheckout">
                {{ userData.nickname }}的代辦
              </p>
              <a
                href="#"
                class="link-dark text-decoration-none ms-auto ms-md-4"
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
          <div class="pt-4 pt-md-c4-4">
            <p class="text-center mb-3">目前尚無待辦事項</p>
            <img
              alt="totoList logo"
              class="img-fluid d-block mx-auto"
              src="@/assets/images/empty 1.png"
            />
          </div>
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
              <ul
                class="tab-pane list-unstyled fade show active px-3 pb-3 pt-4 ps-md-4 pb-md-4"
                id="allList-tab-pane"
                role="tabpanel"
                aria-labelledby="allList-tab"
                tabindex="0"
              >
                <div class="d-flex align-items-start" v-for="item in todos" :key="item.id">
                  <li
                    class="form-check custom-checkbox listBorder-bottom flex-grow-1 d-flex ps-0 pb-3 mb-3"
                    :class="{ isDone: item.status }"
                  >
                    <!-- <input
                      class="form-check-input ms-0 me-3"
                      type="checkbox"
                      v-model="item.status"
                      :id="item.id"
                    />

                    <label class="form-check-label" :for="item.id">{{ item.content }} </label>
                    <button
                      type="button"
                      @click="deleteTodo(item.id)"
                      class="btn-close d-md-none ms-auto"
                    ></button> -->
                    <button
                      v-if="!item.status"
                      type="button"
                      class="btn border-0 fs-5 pt-0"
                      @click="updateTodo(item.id)"
                    >
                      <i class="bi bi-app"></i>
                    </button>
                    <button
                      v-else
                      type="button"
                      class="btn border-0 fs-5 text-warning pt-0"
                      @click="updateTodo(item.id)"
                    >
                      <i class="bi bi-check-lg"></i>
                    </button>
                    <p>{{ item.content }}</p>
                    <button
                      type="button"
                      @click="deleteTodo(item.id)"
                      class="btn-close d-md-none ms-auto"
                    ></button>
                  </li>
                  <button
                    type="button"
                    @click="deleteTodo(item.id)"
                    class="btn-close d-none d-md-block ms-auto"
                  ></button>
                </div>
                <p class="py-2">{{ todosNum.undone }}個待完成項目</p>
              </ul>
              <!-- undone List -->
              <ul
                class="tab-pane list-unstyled fade p-3 py-md-4 ps-md-4 pe-md-3"
                id="undone-tab-pane"
                role="tabpanel"
                aria-labelledby="undone-tab"
                tabindex="0"
              >
                <div class="d-flex align-items-start" v-for="item in undoneTodos" :key="item.id">
                  <li
                    class="form-check custom-checkbox listBorder-bottom flex-grow-1 d-flex ps-0 pb-3 mb-3"
                    :class="{ isDone: item.status }"
                  >
                    <button
                      v-if="!item.status"
                      type="button"
                      class="btn border-0 fs-5 pt-0"
                      @click="updateTodo(item.id)"
                    >
                      <i class="bi bi-app"></i>
                    </button>
                    <button
                      v-else
                      type="button"
                      class="btn border-0 fs-5 text-warning pt-0"
                      @click="updateTodo(item.id)"
                    >
                      <i class="bi bi-check-lg"></i>
                    </button>
                    <p>{{ item.content }}</p>
                    <button
                      type="button"
                      @click="deleteTodo(item.id)"
                      class="btn-close d-md-none ms-auto"
                    ></button>
                  </li>
                  <button
                    type="button"
                    @click="deleteTodo(item.id)"
                    class="btn-close d-none d-md-block ms-auto"
                  ></button>
                </div>
                <p class="py-2">{{ todosNum.undone }}個待完成項目</p>
              </ul>
              <!-- done List -->
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
                      @click="updateTodo(item.id)"
                    >
                      <i class="bi bi-app"></i>
                    </button>
                    <button
                      v-else
                      type="button"
                      class="btn border-0 fs-5 text-warning pt-0"
                      @click="updateTodo(item.id)"
                    >
                      <i class="bi bi-check-lg"></i>
                    </button>
                    <p>{{ item.content }}</p>
                    <button
                      type="button"
                      @click="deleteTodo(item.id)"
                      class="btn-close d-md-none ms-auto"
                    ></button>
                  </li>
                  <button
                    type="button"
                    @click="deleteTodo(item.id)"
                    class="btn-close d-none d-md-block ms-auto"
                  ></button>
                </div>
                <p class="py-2">{{ todosNum.done }}個已完成項目</p>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="about">
    <h1>This is an todoList page</h1>
  </div> -->
</template>

<style></style>
