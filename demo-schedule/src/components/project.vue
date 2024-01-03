<script setup>
import {ref, reactive, onMounted} from 'vue'

import {defineSchoolfellowStore} from "../store/schoolfellowStore.js";
import request from '../utils/request'
import {defineUser} from "../store/userStore.js";

let schoolfellows = defineSchoolfellowStore()
let sysUser = defineUser()

let searchForm = reactive({
  currentPage: '',
  pageSize: '',
  name: "",
  gender: "",
  create_time: []
})


let dialogFormVisible = ref(false)

let dialogFormVisible1 = ref(false)

const formLabelWidth = '140px'


const form = reactive({
  id: '',
  name: "",
  gender: "",
  phone: "",
  email: "",
  workplace: "",
  major: ""
})

const form1 = reactive({
  id: '',
  name: "",
  gender: "",
  phone: "",
  email: "",
  workplace: "",
  major: ""
})


function onSubmit() {
  show()
}


async function handleDelete(row) {
  let id = row.id;
  let {data} = await request.delete(`/schoolfellow/${id}`, {
    headers: {
      "token": sysUser.jwt
    }
  });
  if (data.code === 1) {
    // 注册成功跳转 登录页
    alert("删除成功")
  }
  await show();
}

async function handleUpdate(row) {

  let id = row.id;
  let {data} = await request.get(`/schoolfellow/${id}`, {
    headers: {
      "token": sysUser.jwt
    }
  });
  form1.id = id;

  dialogFormVisible1.value = true

  form1.name=data.date.name
}


function handleSizeChange() {
  show()
}


async function MyUpdate() {
  try {
    // 异步请求
    let {data} = await request.post("/schoolfellow/update", {
      id: form1.id,
      name: form1.name,
      gender: form1.gender,
      phone: form1.phone,
      email: form1.email,
      workplace: form1.workplace,
      major: form1.major
    }, {
      headers: {
        "token": sysUser.jwt
      }
    });

    // 处理 response
    console.log('成功修改:', data.code);
  } catch (error) {
    // 处理错误
    console.error('添加出错');
    // 在这里添加适当的错误处理逻辑
  } finally {
    // 不论异步请求成功或失败，都会执行的代码
    dialogFormVisible1.value = false; // 通过 .value 设置 ref 的值
    await show()
  }
}


async function addStudent() {
  try {
    // 异步请求
    let response = await request.post("/schoolfellow", {
      name: form.name,
      gender: form.gender,
      phone: form.phone,
      email: form.email,
      workplace: form.workplace,
      major: form.major
    }, {
      headers: {
        "token": sysUser.jwt
      }
    });

    // 处理 response
    console.log('成功添加学生:', response.data);
  } catch (error) {
    // 处理错误
    console.error('添加学生时出错:', error);
    // 在这里添加适当的错误处理逻辑
  } finally {
    // 不论异步请求成功或失败，都会执行的代码
    dialogFormVisible.value = false; // 通过 .value 设置 ref 的值
    await show()
  }
}

async function show() {
  // 发送异步请求,获得当前用户的所有记录
  let {data} = await request.get("/schoolfellow", {
    params: {
      page: searchForm.currentPage || 1,
      pageSize: searchForm.pageSize || 10,
      name: searchForm.name,
      gender: searchForm.gender,
      begin: searchForm.create_time[0] || "",
      end: searchForm.create_time[1] || ""
    },
    headers: {
      "token": sysUser.jwt
    }
  });
  schoolfellows.schoolfellowList = data.data.rows
  schoolfellows.total = data.data.total
  console.log(schoolfellows.total)
}

onMounted(async () => {
  await show()
})

</script>


<template>
  <div>
    <el-container style="height: 700px; border: 1px solid #eee">
      <el-container>
        <el-aside width="200px">
          <el-menu :default-opened="['1', '3']">
          </el-menu>
        </el-aside>

        <el-main>
          <!-- 表单 -->
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item>
              <el-button text @click="dialogFormVisible = true">
                添加
              </el-button>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="searchForm.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="searchForm.gender" placeholder="性别">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="2"></el-option>
                <el-option label="不限" value=""></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>

          </el-form>

          <!-- 表格 -->
          <el-table :data="schoolfellows.schoolfellowList" border>
            <el-table-column prop="id" label="编号" width="120"></el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="gender" label="性别" width="120">
              <template v-slot="{ row }">
                {{ row.gender === 1 ? '男' : '女' }}
              </template>
            </el-table-column>
            <el-table-column prop="phone" label="电话" width="120"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="120"></el-table-column>
            <el-table-column prop="workplace" label="工作地点" width="120"></el-table-column>
            <el-table-column prop="major" label="专业" width="120"></el-table-column>

            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button type="primary" size="default" @click="handleUpdate(scope.row)">修改</el-button>
                <el-button type="danger" size="default" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>

          </el-table>


          <el-pagination
              background
              layout="total,sizes,prev,pager,next,jumper"
              @size-change="handleSizeChange"
              :total="schoolfellows.total"
              v-model:current-page="searchForm.currentPage"
              :page-sizes="[10, 20, 30, 40]"
              v-model:page-size="searchForm.pageSize"
              @current-change="handleSizeChange"
          ></el-pagination>


          <!-- Form -->
          <el-dialog v-model="dialogFormVisible" title="Shipping address">
            <el-form :model="form">
              <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="性别" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="你的性别">
                  <el-option label="男" value="1"/>
                  <el-option label="女" value="0"/>
                </el-select>
              </el-form-item>
              <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="form.phone" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.email" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="工作地点" :label-width="formLabelWidth">
                <el-input v-model="form.workplace" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="专业" :label-width="formLabelWidth">
                <el-input v-model="form.major" autocomplete="off"/>
              </el-form-item>
            </el-form>
            <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click=addStudent()>
          确定
        </el-button>
      </span>
            </template>
          </el-dialog>


          <!--            更新弹窗-->
          <el-dialog v-model="dialogFormVisible1" title="Shipping address">
            <el-form :model="form1">
              <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="form1.name" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="性别" :label-width="formLabelWidth">
                <el-select v-model="form1.region" placeholder="你的性别">
                  <el-option label="男" value="1"/>
                  <el-option label="女" value="0"/>
                </el-select>
              </el-form-item>
              <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="form1.phone" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="form1.email" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="工作地点" :label-width="formLabelWidth">
                <el-input v-model="form1.workplace" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="专业" :label-width="formLabelWidth">
                <el-input v-model="form1.major" autocomplete="off"/>
              </el-form-item>
            </el-form>
            <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取消</el-button>
        <el-button type="primary" @click=MyUpdate()>
          确定
        </el-button>
      </span>
            </template>
          </el-dialog>


        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>