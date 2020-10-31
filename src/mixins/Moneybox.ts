import Vue from 'vue'
import Component from 'vue-class-component'
import dayjs from 'dayjs';
import {Watch} from 'vue-property-decorator';

// Define a super class component
@Component
export default class Moneybox extends Vue {
    //@ts-ignore
    $store

    el: Element | undefined;
    msg: string = '';
    msg_type: string = '';
    msg_show: boolean = false;
    dateYYYYMM: string = dayjs().format('YYYY-MM');
    dateYYYYMMDD: string = dayjs().format('YYYY-MM-DD');
    dateYXD:string|undefined;


    get date_YYYY_MM(){
        return this.dateYYYYMM
    }
    get date_YYYY_MM_DD(){
        return this.dateYYYYMMDD
    }

    showNumPad() {
        this.el = this.$refs.NumPad as Element;
        this.el.classList.remove('go_bottom');
        this.el.classList.add('go_top');
    }
    showMsg(msg: string, msg_type: string) {
        this.msg_show = true;
        this.msg = msg;
        this.msg_type = msg_type;
        setTimeout(() => {
            this.msg_show = false;
        }, 800);
    }


}
