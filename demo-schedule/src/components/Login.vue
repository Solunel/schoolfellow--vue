<script setup>
        import {ref,reactive} from 'vue'
        import {useRouter} from 'vue-router'
        const router = useRouter()

        import{ defineUser}  from '../store/userStore.js'
        let sysUser = defineUser()
        import request  from '../utils/request'

        let loginUser =reactive({
                username:"",
                password:""
        })

        //提示信息
       let usernameMsg =ref("")
       let userPwdMsg =ref("")

       
       //校验用户名
       function checkUsername(){
            let usernameReg= /^[a-zA-Z0-9]{5,10}$/
            if(!usernameReg.test(loginUser.username)){
                usernameMsg.value="格式有误"
                return false
            }
            usernameMsg.value="OK"
            return true
       }

       //校验密码
       function checkUserPwd(){
            let userPwdReg = /^[0-9]{6}$/

            if(!userPwdReg.test(loginUser.password)){
                userPwdMsg.value="格式有误"
                return false
            }

            userPwdMsg.value="OK"
            return true
       }

       async function login(){
            // 表单数据格式都正确再提交
            let flag1 =checkUsername()
            let flag2 =checkUserPwd()
            if(!(flag1 && flag2)){
                return 
            }
         let {data} = await request.post("/login",loginUser)
           if(data.code === 1 ){
                alert("登录成功")
                console.log(data)
                // 获得登录的令牌,更新到pinia中
             sysUser.jwt =data.data
             console.log(sysUser.jwt)
                // 跳转到showSchedule
                router.push("/project")
           } else{
             alert("登录失败，请检查用户名与密码是否正确")
           }
           
       }
</script>

<template>
  <div>
    <h3 class="ht">请登录</h3>
        <table class="tab" cellspacing="0px">
            <tr class="ltr">
                <td>请输入账号</td>
                <td>
                    <input class="ipt" 
                    type="text" 
                    v-model="loginUser.username"
                    @blur="checkUsername()">
                    <span id="usernameMsg" v-text="usernameMsg"></span>
                </td>
            </tr>
            <tr class="ltr">
                <td>请输入密码</td>
                <td>
                    <input class="ipt" 
                    type="password" 
                    v-model="loginUser.password"
                    @blur="checkUserPwd()">
                    <span id="userPwdMsg" v-text="userPwdMsg"></span>
                </td>
            </tr>
            <tr class="ltr">
                <td colspan="2" class="buttonContainer">
                    <input class="btn1" type="button" @click="login()" value="登录">
                    <input class="btn1" type="button" value="重置">
                    <router-link to="/regist">
                      <button class="btn1">去注册</button>
                    </router-link>
                </td>
            </tr>
        </table>
  </div>
</template>

<style scoped>
        .ht{
            text-align: center;
            color: cadetblue;
            font-family: 幼圆,serif;
        }
        .tab{
            width: 500px;
            border: 5px solid cadetblue;
            margin: 0 auto;
            border-radius: 5px;
            font-family: 幼圆,serif;
        }
        .ltr td{
            border: 1px solid  powderblue;
        }
        .ipt{
            border: 0;
            width: 50%;
        }
        .btn1{
            border: 2px solid powderblue;
            border-radius: 4px;
            width:60px;
            background-color: antiquewhite;
        }
        #usernameMsg , #userPwdMsg {
            color: gold;
        }
        .buttonContainer{
            text-align: center;
        }
</style>
