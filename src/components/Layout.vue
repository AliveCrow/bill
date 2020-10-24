<template>
  <div id="content">
    <div class="main">
      <slot></slot>
    </div>
    <Nav />
  </div>
</template>

<script lang='ts'>
export default {
name: "Layout"
}
</script>

<style scoped lang='scss'>
#content{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  .main{
    overflow-y: scroll;
  }
}
</style>