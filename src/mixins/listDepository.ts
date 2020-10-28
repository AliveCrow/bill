import Vue from 'vue'
import Component from 'vue-class-component'

// Define a super class component
@Component
export default class listDepository extends Vue {
    //@ts-ignore
    $store
    get tags(){
        this.$store.commit('tagsStore/tagsGetter')
        return this.$store.state.tagsStore.tagsDataSource
    }

    created(){
        this.$store.commit('recordStore/recordListgetter')
    }
}