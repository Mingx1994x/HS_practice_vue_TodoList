<script setup>
import { RouterLink, useRouter } from 'vue-router'
import axios from 'axios'
import { ref } from 'vue'

const HexAPI = 'https://todolist-api.hexschool.io'
const router = useRouter()
// login
const loginData = ref({
  email: '',
  password: ''
})
const errResponse = ref('')
const isLogin = ref('')
const login = async () => {
  // console.log(`${HexAPI}/users/sign_in`)
  try {
    const res = await axios.post(`${HexAPI}/users/sign_in`, loginData.value)
    console.log(res)
    document.cookie = `userToken=${res.data.token}; `
    isLogin.value = true
    router.push('/todoList')
  } catch (error) {
    console.log(error)
    errResponse.value = error.response.data.message
    loginData.value.password = ''
    isLogin.value = false
  }
}
</script>

<template>
  <div class="loginView">
    <div class="row d-flex">
      <div class="col-md-8 mx-auto">
        <h2 class="text-center fs-5 fs-md-4 mb-c4-1 mb-md-4">最實用的線上代辦事項服務</h2>
        <div class="pe-2 pe-md-0 mb-c4-3 mb-md-c3-1">
          <label for="userEmail" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            :class="{ 'is-invalid': !loginData.email }"
            id="userEmail"
            placeholder="請輸入Email"
            v-model="loginData.email"
          />
          <div class="invalid-feedback">此欄位不可為空</div>
        </div>
        <div class="pe-2 pe-md-0 mb-4">
          <label for="userPwd" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            :class="{ 'is-invalid': !isLogin }"
            id="userPwd"
            placeholder="請輸入密碼"
            v-model="loginData.password"
          />
          <div class="invalid-feedback">{{ errResponse }}</div>
        </div>
        <div class="d-flex justify-content-center mb-4">
          <button type="button" class="btn btn-dark rectangleBtn" @click="login">登入</button>
        </div>
        <div class="d-flex justify-content-center">
          <RouterLink to="/register" class="router-link btn border-0"> 註冊帳號 </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
