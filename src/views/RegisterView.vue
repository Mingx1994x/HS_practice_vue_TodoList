<script setup>
import axios from 'axios'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const HexAPI = 'https://todolist-api.hexschool.io'
const router = useRouter()
// sign up
const signupData = ref({
  email: '',
  password: '',
  nickname: ''
})
const checkPwd = ref('')
const checker = computed(() => checkPwd.value === signupData.value.password)
// const signupRes = ref('')
const errResponse = ref('')
const signup = async () => {
  try {
    if (!signupData.value.email || !signupData.value.password || !signupData.value.nickname) {
      alert('還有欄位未填喔')
      return
    } else if (checkPwd.value !== signupData.value.password) {
      alert('密碼欄位不一致喔')
      return
    }
    await axios.post(`${HexAPI}/users/sign_up`, signupData.value)
    // console.log(res)
    // signupRes.value = res.data.uid
    alert(`${signupData.value.nickname}，恭喜完成註冊嘍！！！\n` + '可以直接登入使用服務嘍')
    router.push('/')
  } catch (error) {
    // console.log(error)
    errResponse.value = error.response.data.message
    alert(errResponse.value)
  }
}
</script>
<template>
  <div class="registerView">
    <div class="row d-flex">
      <div class="col-md-8 mx-auto">
        <div class="px-c3-1 px-md-0 py-0 py-md-c6">
          <h2 class="text-center text-md-start fs-4 mb-4">註冊帳號</h2>

          <div class="mb-3">
            <label for="userEmail" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="userEmail"
              placeholder="請輸入Email"
              v-model="signupData.email"
            />
          </div>
          <div class="mb-3">
            <label for="userNickname" class="form-label">您的暱稱</label>
            <input
              type="text"
              class="form-control"
              id="userNickname"
              placeholder="請輸入您的暱稱"
              v-model="signupData.nickname"
            />
          </div>
          <div class="mb-3">
            <label for="userPwd" class="form-label">密碼</label>
            <input
              type="password"
              class="form-control"
              id="userPwd"
              placeholder="請輸入密碼"
              v-model="signupData.password"
            />
          </div>
          <div class="mb-c2-1 mb-md-4">
            <label for="checkPwd" class="form-label">再次輸入密碼</label>
            <input
              type="password"
              class="form-control"
              id="checkPwd"
              placeholder="請再次輸入密碼"
              v-model="checkPwd"
            />
            <div v-show="!checker" class="text-danger">密碼不一致</div>
          </div>
          <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-dark rectangleBtn mb-4" @click="signup">
              註冊帳號
            </button>
          </div>
          <div class="d-flex justify-content-center">
            <RouterLink to="/" class="router-link btn border-0"> 登入 </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
