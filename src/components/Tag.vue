<template>
<div id="tag"  :class="add">
  <span>
    <slot></slot>
  </span>
</div>
</template>

<script lang='ts'>
export default {
  props:['bgc','add'],
  name: "Tag"
}
</script>

<style scoped lang='scss'>
@import "public/css/var";
#tag{
  display: inline-block;
  color: $whiteColor;
  background-color: $fontColor;
  border-radius: 3px;
  padding: 1px 5px;
  margin: 5px;
}
</style>