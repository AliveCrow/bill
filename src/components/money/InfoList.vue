<template>
  <div class="into_list">
    <blockquote v-for="date in this.toMonthList" :key="date.index">
      <div class="into_list_date">
        <p>{{ date.createAt }}</p>
        <p style="color:#F56C6C">支出{{ getSum (date.items, '-') }},<span
            style="color:#3da75b">收入{{ getSum (date.items, '+') }}</span></p>
      </div>
      <ul>
        <li v-for="item in date.items">
          <div class="list__item">
          <span class="list__item__1" >
            {{item.tags[0].name}}
          </span>
            <div class="list__item__2">
              <span class="tags">
                {{ item.createAt }}
              </span>
            </div>

          </div>
          <span :style="item.types==='-'?'color:#F56C6C':'color:#3da75b' ">
            {{ item.types }}{{ item.num }}
          </span>
        </li>
      </ul>
    </blockquote>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import listDepository from '@/mixins/listDepository';
import dayjs from 'dayjs';


@Component
export default class InfoList extends mixins(listDepository) {
  @Prop(String) date: string | undefined;

  sum: [] | undefined;


  getSum(items: any[], type: any) {
    let sum = 0;
    let x = items.filter(item => item.types === type);
    x.forEach(item => {
      return sum = item.num + sum;
    });
    return sum;
  }


}


</script>

<style scoped lang='scss'>
@import "../../../public/css/var";
.into_list {
  .into_list_date {
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 5px 10px;
    border-bottom: 1px solid rgba($navBgColor,1);
    .list__item {
      text-align: left;
      height: 100%;
      display: flex;
      flex-direction: column;
      .list__item__1 {
          height: 30px;
        line-height: 30px;
      }
      .list__item__2{
        height: 10px;
        line-height: 15px;
      }
      .tags {
        font-size: .5rem;
        color: rgba($fontColor,.4);
        padding: 2px 5px;
        border-radius: 3px;
      }
    }


  }
}

</style>