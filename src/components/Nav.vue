<template>
  <nav>
    <router-link active-class="selected" class="router_link" to="/money">
      <Icon name="money" />
      Money
    </router-link>
    <router-link active-class="selected" class="router_link" to="/labels">
      <Icon name="label" />
      Labels
    </router-link>
    <router-link active-class="selected" class="router_link" to="/statistics">
      <Icon name="statistics" />
      Statistics
    </router-link>
  </nav>
</template>

<script lang='ts'>
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