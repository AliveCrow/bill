<template>
  <div id="content" >
    <div class="main" :class="className">
      <slot></slot>
    </div>
    <Nav />
  </div>
</template>

<script lang='ts'>
export default {
  props:['className'],
name: "Layout"
}
</script>

<style scoped lang='scss'>
#content{
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .main{
    height: 100%;
    overflow-y: auto;
  }
}
</style>