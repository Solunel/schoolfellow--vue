<script setup>
//导入头
import Header from './components/Header.vue'
import project from './components/project.vue'
import Project from "./components/project.vue";

</script>

<template>
  <div>
    <!-- 标头 -->
<Header></Header>
    <hr>
<router-view></router-view>
<!--<project></project>-->
  </div>

</template>

<style scoped>

</style>
