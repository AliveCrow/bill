<template>
  <nav>
    <router-link active-class="selected" class="router_link" to="/money">
      <Icon idName="money" />
      账单
    </router-link>
    <router-link active-class="selected" class="router_link" to="/labels">
      <Icon idName="label" />
      标签
    </router-link>
    <router-link active-class="selected" class="router_link" to="/statistics">
      <Icon idName="statistics" />
      统计
    </router-link>
  </nav>
</template>

<script lang='ts'>
export default {
  name: "Nav"
}
</script>

<style scoped lang='scss'>
@import "../assets/scss/css/app";
nav {
  box-shadow: 0 0 3px rgba(#000, .3);
  display: flex;
  flex-direction: row;
  background-color: $whiteColor;
  position: relative;
  z-index: 99;
  .router_link {
    flex-grow: 1;
    padding-top: 10px;
    padding-bottom: 5px;
    text-align: center;
    color: $fontColor;
  }

  & .icon {
    display: block;
    margin: 0 auto;
    width: 1.5em;
    height: 1.5em;
  }
  .selected{
    color: $headerColor;
  }
}
</style>