<script setup>
// import axios from 'axios'
// import { onMounted, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

// const HexAPI = 'https://todolist-api.hexschool.io'
// const token = ref('')
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
    <RouterLink to="/"> Login </RouterLink>| <RouterLink to="/todoList"> todoList </RouterLink>|
  </header>
  <!-- <main class="bg-cus-primary">
    <div class="container-lg">
      <div class="row d-flex flex-column flex-md-row">
        <div class="col-md-6">
          <TheWelcome></TheWelcome>
        </div>
        <div class="col-md-6 d-flex flex-column justify-content-center">
          <div class="row d-flex">
            <div class="col-md-8 mx-auto">
              <h2 class="text-center">最實用的線上代辦事項服務</h2>
              <div>
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
              <div>
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
              <div class="d-flex justify-content-center">
                <button type="button" class="btn btn-dark cus-btn-dark" @click="login">登入</button>
              </div>
              <div class="d-flex justify-content-center">
                <RouterLink to="/todoList"> 註冊帳號 </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main> -->

  <RouterView />
</template>
