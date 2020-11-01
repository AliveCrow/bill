import Vue from 'vue';
import Component from 'vue-class-component';
import dayjs from 'dayjs';

// Define a super class component
@Component
export default class listDepository extends Vue {
    //@ts-ignore
    $store;
    msg: string = '';
    msg_type: string = '';
    msg_show: boolean = false;

    created() {
        this.$store.commit(('recordStore/recordListgetter'), ('setDate')); //获取数据,初始化时间
    }

    showMsg(msg: string, msg_type: string) {
        this.msg_show = true;
        this.msg = msg;
        this.msg_type = msg_type;
        setTimeout(() => {
            this.msg_show = false;
        }, 800);
    }


    get getDate() {
        return this.$store.state.date;
    }

    setDate(date: string, change_source: boolean = true) {
        if (change_source) {
            this.$store.commit('setDate', date);
        }
        return this.$store.getters['getDate'];
    }

    get tags() {
        this.$store.commit('tagsStore/tagsGetter');
        return this.$store.state.tagsStore.tagsDataSource;
    }

    checkTag(text: string) {
        let res = this.tags.filter((item: { name: string; }) => item.name === text);
        if(res.length !== 0 || text === ''){
            return false
        }else {
            return true
        }
    }


    //列出没处理过的所有账单=>[{tags, remark, types, num, createAt}]
    get primordialRecords() {
        return this.$store.state.recordStore.recordLists;
    }

    //hash化所有账单=>[{createAt,items}]
    get records() {
        return this.$store.getters['recordStore/setGroupings'];
    }

    //选择月账单=>[{tags, remark, types, num, createAt}]
    get toMonthList() {
        return this.$store.getters['recordStore/getMonList'];
    }


    get num() {
        return this.$store.getters['recordStore/payOrIncomeSelect'];
    }


}
