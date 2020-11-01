<template>
  <div class="icons__item">
    <img src="../../public/img/404.png" alt="" >
    <div>
      Page not found
    </div>
    <router-link to="./" class="back">尝试返回主页</router-link>
  </div>
</template>

<script lang='ts'>
export default {
name: "NotFound"
}
</script>

<style scoped lang='scss'>
.icons__item{
  margin-top: 50px;
  >img{
    max-width: 700px;
    width: 100%;
  }
  >div{
    font-size: 2rem;
    margin: 50px;
  }
  .back{
    color: #E6A23C;
  }
}
</style>