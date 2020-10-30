<template>
  <div>
    <Layout>
      <StaticHeader  />
    </Layout>
  </div>
</template>

<script lang='ts'>
import Types from '@/components/money/Types.vue';
import StaticHeader from '@/components/statistics/StaticHeader.vue';
import HeaderMain from '@/components/statistics/HeaderMain.vue';

export default {
  name: 'statistics',
  components: {
    HeaderMain,
    StaticHeader,
    Types,
  }
};
</script>

<style scoped lang='scss'>
@import "public/css/var";


</style>