<script setup>
  /* 导入pinia数据 */
  import {defineUser} from "../store/userStore.js"


  let sysUser = defineUser()



  import {useRouter} from 'vue-router'
  let router = useRouter()

  function logout(){
    // 清除所有pinia数据
    sysUser.$reset()
    // 跳转到登录页
    router.push("/login")
  }

</script>

<template>
  <div>
    <h1 class="ht">欢迎使用校友管理信息系统</h1>
    <div>
      <div  class="optionDiv" v-if="sysUser.jwt === ''">
        <router-link to="/login">
          <button class="b1s">登录</button>
        </router-link>   
        <router-link to="/regist">
          <button class="b1s">注册</button>
        </router-link>
      </div>


      <div   class="optionDiv" v-else>
        <button class="b1b" @click="logout()">退出登录</button>
      </div>
      <br>
    </div>
  </div>
</template>

<style scoped>

  .ht{
      text-align: center;
      color: cadetblue;
      font-family: 幼圆,cursive;
  }
  .b1s{
        border: 2px solid powderblue;
        border-radius: 4px;
        width:60px;
        background-color: antiquewhite;

    }

    .b1b{
        border: 2px solid powderblue;
        border-radius: 4px;
        width:100px;
        background-color: antiquewhite;
    }
    .optionDiv{
      width: 400px;
      float: right;
    }
</style>
