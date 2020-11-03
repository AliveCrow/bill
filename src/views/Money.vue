<template>
    <div id="money" style="padding-bottom: 100px">
      <Layout className="layout_one" ref="layout_one" key="101010"  >
        <HeaderMain  key="1001" :allYearPersent.sync="allYearPersent" :billyType.sync="billyType"/>
        <div key="1002" class="billy_box">
          <transition name="list">
            <div class="info_box" key="911" v-if="billyType === '月账单'">
              <span class="title">月账单</span>
              <transition name="toggle_ani">
                <InfoList :key="uns2"/>
              </transition>
            </div>
            <div v-else class="year_billy">
              <span class="title">年统计</span>
              <ul>
                <li>
              <span class="year_pay">
                <span
                    style="font-size:.7rem">年支出: {{allYearPersent.pay}}</span>
                <div :style="
                'background: rgb(255,72,72);background: linear-gradient(90deg, rgba(255,72,72,1) 0%, rgba(255,72,72,1) '
                +`${allYearPersent.pay/allYearPersent.allYearTotal*100+'%'}`+ ',rgba(240,240,240,1) '
                + `${allYearPersent.pay/allYearPersent.allYearTotal*100+'%'}` +
                ',rgba(240,240,240,1) 100%);'"
                >
                </div>
              </span>
                </li>
                <li>
              <span class="year_in">
                <span
                    style="font-size:.7rem">年收入: {{allYearPersent.InCome}}</span>
              <div :style="
              'background: rgb(103,194,58);background: linear-gradient(90deg, rgba(103,194,58,1) 0%, rgba(103,194,58,1) '
              +`${allYearPersent.InCome/allYearPersent.allYearTotal*100+'%'}`+ ',rgba(240,240,240,1) '
              + `${allYearPersent.InCome/allYearPersent.allYearTotal*100+'%'}` +
              ',rgba(240,240,240,1) 100%);'"
              >
              </div>
              </span>
                </li>
              </ul>
            </div>
          </transition>

        </div>
        <eva-icon key="1003" name="edit-outline" fill="#3da75b" class="icons" animation="shake" height="100%"
                  @click="showNumPad"></eva-icon>
      </Layout >
      <div class="money_box go go_bottom" ref="NumPad" :style="{height:h+'px'}" >
        <div class="money_box_con">
          <eva-icon name="close-outline" fill="#3da75b" class="back" animation="shake" height="100%"
                    @click="hideNumPad"></eva-icon>
          <NumberPad :value.sync="recordListItem.num" @submit="submit" :key="uns1" style="padding-bottom: 160px" />
          <Types @exposeType="getType" :value="recordListItem.types"/>
          <div style="height: 53px;position: relative;">
            <label for="start" class="header_input">
              <input type="date" id="start" name="start"
                     min="2020-01-01" ref="year_day"
                     @change="setCreateDate"
              >
            </label>
          </div>
          <label class="remark" >
            <span>备注:</span>
            <input v-model="recordListItem.remark" type="text" placeholder="请在这里输入备注">
          </label>
          <Tag  :selectedTags.sync="recordListItem.tags" :key="uns3" :isError.sync="isError"/>
          <Message :type="msg_type" ref="msg" v-show="msg_show">
            {{ msg }}
          </Message>
        </div>

      </div>
    </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import NumberPad from '@/components/money/NumberPad.vue';
import {Component, Watch} from 'vue-property-decorator';
import Types from '@/components/money/Types.vue';
import dayjs from 'dayjs';
import HeaderMain from '@/components/HeaderMain.vue';
import InfoList from '@/components/money/InfoList.vue';
import SelectDate from '@/components/SelectDate.vue';
import {mixins} from 'vue-class-component';
import listDepository from '@/mixins/listDepository';

@Component({
  components: {SelectDate, InfoList, HeaderMain, Types, NumberPad}
})
export default class Money extends mixins(listDepository) {
  // @ts-ignore
  $router;
  el: Element | undefined;
  recordListItem: TypeList = {
    tags: [], remark: '', types: '-', num: 0, createAt: dayjs().format('YYYY-MM-DD')
  };
  date: string = dayjs().format('YYYY-MM-DD');
  list: string[] = [];
  uns1: number = 1;
  uns2: number = 2;
  uns3: number = 3;
  isError: boolean = false;
  msg_show: boolean = false;
  allYearPersent = {};
  billyType: string = '月账单';
  h:number =0;

  created(){
    this.h = document.body.clientHeight;
  }

  mounted() {
    // @ts-ignore
    this.$refs.year_day.value = dayjs().format('YYYY-MM-DD');
  }

  getTags(list: string[]) {
    this.recordListItem.tags = list;
  }

  getType(type: string) {
    this.recordListItem.types = type;
  }

  setCreateDate(e: { target: { value: string; }; }) {
    this.recordListItem.createAt = e.target.value;
    // @ts-ignore
    this.$refs.year_day.value = e.target.value;
  }

  resetList() {
    this.recordListItem = {
      tags: [], remark: '', types: '-', num: 0, createAt: dayjs().format('YYYY-MM-DD')
    };
  }

  resetNumPad() {
    // @ts-ignore
    this.$refs.year_day.value = dayjs().format('YYYY-MM-DD');
    this.recordListItem.remark = '';
    this.uns1 = 100;
    this.uns3 = 300;
  }

  hideNumPad() {
    this.el = this.$refs.NumPad as Element;
    this.el.classList.add('go_bottom');
    this.el.classList.remove('go_top');
    setTimeout(() => {
      this.resetNumPad();
      // @ts-ignore
      this.el.style.display ='none'
    }, 500);
  }

  showNumPad() {
    this.uns1 = 1;
    this.uns2 = 2;
    this.uns3 = 3;
    this.el = this.$refs.NumPad as Element;
    // @ts-ignore
    this.el.style.display ='flex'
    setTimeout(()=>{
      // @ts-ignore
      this.el.classList.remove('go_bottom');
      // @ts-ignore
      this.el.classList.add('go_top');
    },100)
  }

  submit() {
    if (this.recordListItem.num <= 0) {
      this.showMsg('请输入金额', 'Danger');
      return;
    }
    if (this.recordListItem.tags.length === 0) {
      if (this.recordListItem.types === '-') {
        // @ts-ignore
        this.recordListItem.tags.push({name: '支出'});
      } else {
        // @ts-ignore
        this.recordListItem.tags.push({name: '收入'});
      }
    }
    this.$store.commit('recordStore/recordListSetter', this.recordListItem);
    this.resetList();
    this.showMsg('记录成功', 'Success');
    setTimeout(() => {
      this.msg_show = false;
      this.hideNumPad();
      this.uns2 = 0;
    }, 400);
  }

  @Watch('isError')
  onch() {
    console.log(this.isError );
    if (this.isError) {
      this.showMsg('标签创建失败,请检查是否有重名标签并且不能为空', 'Danger');
      setTimeout(() => {
        this.msg_show = false;
        this.isError = false;
      }, 1000);
    }
  }
}
</script>

<style scoped lang='scss'>
@import "../assets/scss/css/var";

.toggle_ani-enter-active,
.toggle_ani-leave-active {
  transition: opacity .3s;
}
.toggle_ani-enter,
.toggle_ani-leave-to {
  opacity: 0;
}

//.list
.list-enter-active,
.list-leave-active {
  animation: list_ani 0.4s cubic-bezier(.17,.67,.02,.97);
}
.list-enter,.list-leave-to{
  transform: translateX(0);
  display: none;
}


@keyframes list_ani {
  0%{
    transform: translateX(50%);
  }
  100%{
    transform: translateX(0);
  }
}

#app{
  overflow: hidden;
  height: 100vh;
}
.icons {
  background-color: rgba($whiteColor, 1);
  box-shadow: 0 0 10px rgba(#000, .2);
  border-radius: 50%;
  height: 50px;
  width: 50px;
  text-align: center;
  line-height: 50px;
  position: fixed;
  right: 30px;
  bottom: 100px;
  z-index: 10;
}

.billy_box {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #fff;
  margin-top: -30px;

  .year_billy {
    ul > li {
      text-align: left;
      width: 80%;
      margin: 5px auto;

      span {
        width: 100%;
        align-items: center;
      }

      .year_pay {
        color: $Danger;

        > div {
          border-radius: 10px;
          margin-bottom: 10px;
          width: 100%;
          height: 5px;
          background-color: $Danger;
        }
      }

      .year_in {
        color: $Success;
        > div {
          border-radius: 10px;
          margin-bottom: 10px;
          width: 100%;
          height: 5px;
          background-color: $Success;
        }
      }
    }
  }

  .title {
    display: block;
    margin: 10px;
    padding: 10px;
    font-size: 1.4rem;
  }
}

.go {
  transition: all .5s ease .25s;
}

.go_top {
  transform: translateY(0);
}

.go_bottom {
  transform: translateY(100%);
}

.money_box {
  z-index: 10;
  display: none;
  flex-direction: column-reverse;
  width: 100%;
  //height: 100vh;
  position: absolute;
  top: 0;
  background-color: #fff;
  padding-bottom: 63px;
  overflow: hidden;
  .money_box_con{
    display: flex;
    flex-direction: column-reverse;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: auto;
  }
  .back {
    position: fixed;
    top: 20px;
    right: 20px;
  }

  .header_input {
    input[type='date'] {
      height: 53px;
      border: none;
      outline: none;
      width: 100%;
      text-align: center;
      z-index: 101;
      font-family: $font-family;
      font-size: 1.2rem;
      background-color: rgba($navBgColor, .5);

      &::-webkit-calendar-picker-indicator {
        height: 100%;
        background-image: none;
        color: #666;
        position: absolute;
        width: 100%;
        outline: none;
      }
    }
  }

  .remark {
    padding-left: 10px;
    line-height: 40px;
    text-align: left;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    min-height: 3rem;
    span {
      width: 4rem;
    }
    input {
      padding: 1px 8px;
      width: 100%;
      outline: none;
      border: none;
      line-height: 40px;
      font-size: 1rem;
      color: rgba($fontColor, .6)
    }
  }
}
</style>