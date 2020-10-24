<template>
  <nav>
    <router-link active-class="selected" class="router_link" to="/money">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#money"/>
      </svg>
      Money
    </router-link>
    <router-link active-class="selected" class="router_link" to="/labels">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#label"/>
      </svg>
      Labels
    </router-link>
    <router-link active-class="selected" class="router_link" to="/statistics">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#statistics"/>
      </svg>
      Statistics
    </router-link>
  </nav>
</template>

<script lang='ts'>
import x from '@/assets/icons/money.svg'
import y from '@/assets/icons/label.svg'
import z from '@/assets/icons/statistics.svg'
console.log(x,y,z)
export default {
  name: "Nav"
}
</script>

<style scoped lang='scss'>
nav {
  box-shadow: 0 0 3px rgba(#000, .3);
  display: flex;
  flex-direction: row;

  .router_link {
    flex-grow: 1;
    padding-top: 10px;
    padding-bottom: 5px;
    text-align: center;
  }

  & .icon {
    display: block;
  }

  & .icon {
    margin: 0 auto;
    width: 1.5em;
    height: 1.5em;
    fill: red;
  }
}
</style>