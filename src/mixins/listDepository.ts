import Vue from 'vue'
import Component from 'vue-class-component'
import dayjs from 'dayjs';

// Define a super class component
@Component
export default class listDepository extends Vue {
    //@ts-ignore
    $store
    get tags(){
        this.$store.commit('tagsStore/tagsGetter')
        return this.$store.state.tagsStore.tagsDataSource
    }

    get primordialRecords(){
        return this.$store.state.recordStore.recordLists
    }

    //
    get records(){
        return this.$store.getters['recordStore/setGroupings']
    }

    //账单
    get toMonthList(){
        return  this.$store.state.billyStore.toMonthList
    }
    get total(){
        return  this.$store.state.billyStore.total
    }
    get billy(){
        return  this.$store.state.billyStore.billy
    }

    created(){
        this.$store.commit('recordStore/recordListgetter')
    }

}
