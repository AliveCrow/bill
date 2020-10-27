import Vue from 'vue'
import Component from 'vue-class-component'

// Define a super class component
@Component
export default class Tagslist extends Vue {
    //@ts-ignore
    $store
    get tags(){
        this.$store.commit('tagsGetter')
        return this.$store.state.tagsDataSource
    }


}