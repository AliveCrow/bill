<template>
  <div class="into_list">
    <blockquote v-for="date in this.toMonthList" :key="date.index">
      <div class="into_list_date">
        <p>{{date.createAt}}</p>
        <p>支出{{ getSum(date.items,'-') }},收入{{getSum(date.items,'+') }}</p>
      </div>
      <ul>
        <li v-for="item in date.items">
          <span>{{item.remark || `${item.types==='-'?'消费':'收入'}`  }}</span>
          <span>{{item.types}}{{ item.num }}</span>
        </li>
      </ul>
    </blockquote>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import listDepository from '@/mixins/listDepository';
import dayjs from 'dayjs';


@Component
export default class InfoList extends mixins(listDepository){
@Prop(String) date:string ;

  payOrIncome:any[];
  sum:[];

  created() {
    let list = this.toMonthList.map(item=> {
      return item.items.filter(res => res.types === '-')
    })

  }
  getSum(items,type){
    let sum =0
    let x = items.filter(item=>item.types === type)
    x.forEach(item=>{
      return  sum = item.num+sum
    })
    return sum
  }


}



</script>

<style scoped lang='scss'>
@import "public/css/var";

.into_list {
  .into_list_date {
    background-color: rgba($navBgColor,.3);
    > p:nth-child(1) {
      font-size: 1.5rem;
      text-align: left;
      margin-left: 20px;
    }

    > p:nth-child(2) {
      font-size: .5rem;
      color: #0005;
      text-align: left;
      margin-left: 20px;
    }
  }

  li {
    height: 50px;
    line-height: 50px;
    font-size: 1.4rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    span {
      margin: 0 20px;
      font-size: 1.1rem;
    }

    > span:nth-child(1) {
      float: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    > span:nth-child(2) {
      float: right;
      margin-left: 10px;
    }
  }
}

</style>