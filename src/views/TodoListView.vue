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
    console.log(res)
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
const readTodos = async () => {
  try {
    const res = await axios.get(`${HexAPI}/todos`, {
      headers: {
        authorization: token.value
      }
    })
    console.log(res)
    // todos.value = res.data.data
    const datas = res.data.data
    todos.value = datas.map((data) => ({
      ...data,
      isEditing: false
    }))
    if (datas.length !== 0) isGet.value = false

    console.log(isGet.value)
  } catch (error) {
    console.log(error)
    isGet.value = error.response.data.status
    errResponse.value.read = error.response.data.message
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
</script>
<template>
  <div class="bg-linear-warning-light px-c2-1 pt-3" style="height: 670px">
    <div class="container-lg">
      <header class="mb-3 mb-md-c4-3">
        <div class="row d-flex align-items-center">
          <div class="col-md-4 col-8">
            <img alt="totoList logo" class="img-fluid" src="@/assets/images/logo.png" />
          </div>
          <div class="col-md-8 col-4">
            <div class="d-flex">
              <p class="fw-bold d-none d-md-block ms-auto">{{ userData.nickname }}的代辦</p>
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
            />
            <button class="btn btn-dark rounded-3 fs-5 fw-bold" type="button" id="button-add">
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
        <div class="col-md-6">todolist is coming</div>
      </div>
    </div>
  </div>

  <!-- <div class="about">
    <h1>This is an todoList page</h1>
  </div> -->
</template>

<style></style>
