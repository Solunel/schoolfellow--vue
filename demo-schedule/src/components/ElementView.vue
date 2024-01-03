<template>
    <div>
      <el-container style="height: 700px; border: 1px solid #eee">
        <el-header style="font-size:49px;background-color: rgb(142, 146, 152)">
          校友信息管理系统
        </el-header>
        <el-container>
          <el-aside width="200px">
            <el-menu :default-opened="['1', '3']">
<!--              <el-submenu index="1">-->
<!--                <template slot="title"><i class="el-icon-message"></i>导航一</template>-->
<!--                <el-menu-item index="1-1">选项1</el-menu-item>-->
<!--                <el-menu-item index="1-2">选项2</el-menu-item>-->
<!--              </el-submenu>-->
            </el-menu>
          </el-aside>
  
          <el-main>
            <!-- 表单 -->
            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
              <el-form-item label="姓名">
                <el-input v-model="searchForm.name" placeholder="姓名"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-select v-model="searchForm.gender" placeholder="性别">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="2"></el-option>
                </el-select>
              </el-form-item>
  
              <el-form-item label="入学时间">
                <el-date-picker
                  v-model="searchForm.create_time"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  >
                </el-date-picker>
              </el-form-item>
  
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
  
              <el-form-item>
                <el-button type="primary" @click="dialogVisible = true">
                  增加学生信息
                </el-button>
              </el-form-item>
            </el-form>
  
            <!-- 表格 -->
            <el-table :data="tableData" border>
              <el-table-column prop="name" label="姓名" width="120"></el-table-column>
              <el-table-column prop="gender" label="性别" width="120"></el-table-column>
              <el-table-column prop="phone" label="电话" width="120"></el-table-column>
              <el-table-column prop="email" label="邮箱" width="120"></el-table-column>
              <el-table-column prop="workplace" label="工作地点" width="120"></el-table-column>
              <el-table-column prop="major" label="专业" width="120"></el-table-column>
              <el-table-column label="操作">
                <el-button type="primary" size="mini">修改</el-button>
                <el-button type="danger" size="mini">删除</el-button>
              </el-table-column>
            </el-table>
  
            <!-- 分页组件 -->
            <el-pagination
              background
              layout="total,sizes,prev,pager,next,jumper"
              @size-change="handleSizeChange"
              :total="8"
            ></el-pagination>
  
            <!-- 弹窗组件 -->
            <el-dialog title="增加学生信息" :visible.sync="dialogVisible">
              <el-form :model="addForm" label-width="100px">
                <el-form-item label="姓名">
                  <el-input v-model="addForm.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                  <el-select v-model="addForm.gender" placeholder="请选择性别">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="电话">
                  <el-input v-model="addForm.phone" placeholder="请输入电话"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input v-model="addForm.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="专业">
                  <el-input v-model="addForm.major" placeholder="请输入专业"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addStudent">确 定</el-button>
              </div>
            </el-dialog>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>

  <script>
  import axios from "axios";

  export default {
    data() {
      return {
        tableData: [],
        searchForm: {
          name: "",
          gender: "",
          create_time: []
        },
        dialogVisible: false,
        addForm: {
          name: "",
          gender: "",
          phone: "",
          email: "",
          major: ""
        }
      }
    },
    methods: {
      onSubmit: function() {
        alert(searchForm.name);
      },

      handleSizeChange: function(val) {
        alert("每页记录数变化" + val);
      },

      addStudent: function() {
        axios.get("http://10.51.184.81:8080/schoolfellow", {
          name: this.addForm.name,
          gender: this.addForm.gender,
          phone: this.addForm.phone,
          email: this.addForm.email,
          major: this.addForm.major
        }).then(response => {
          console.log(response.data);
          if (response.data.code == 200) {
            alert("添加成功");
            this.dialogVisible = false;
          } else {
            alert("添加失败");
          }
        }).catch(error => {
          console.log(error);
          alert("添加失败");
        });
      }
    },

    mounted() {
      // 发送异步请求
      axios.get("http://10.51.184.81:8080/schoolfellow").then(result => {
        this.tableData = result.data.data.rows;
      });
    }
  };
  </script>

  <style></style>