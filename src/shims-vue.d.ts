declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '*.svg'{
  const content: string;
  export default content;
}
declare module 'vue/types/vue' {
  // 可以使用 `VueConstructor` 接口
  // 来声明全局 property
  interface VueConstructor {
    $clearRemark: '';
  }
}
declare module 'echarts/lib/echarts'{

}