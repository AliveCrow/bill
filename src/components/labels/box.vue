<template>
  <div class="label_item ">
    <slot></slot>
  </div>
</template>

<script lang='ts'>
export default {
  name: 'box'
};
</script>

<style scoped lang='scss'>
.label_item{
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  padding: 3px;
  text-align: left;
}
</style>