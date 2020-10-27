
import Vue from 'vue'
import Component from 'vue-class-component'

// Define a super class component
@Component
export default class RecordList extends Vue {
    //@ts-ignore
    $store

    get recordList(){
        this.$store.commit('recordListgetter')
        const recordBox = this.$store.state.recordLists as TypeList[]
        return  recordBox
    }

}