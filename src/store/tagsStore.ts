import createId from '@/lib/createId';

type storeTags = {
    tagsListName:string,
    tagsDataSource:Tag[] | undefined
}

const state:storeTags = {
    tagsListName: 'tags',
    tagsDataSource: [],
}

const tagsStore = {
    namespaced:true,
    state,
    mutations: {
        //tag
        tagsGetter: function (state:storeTags) {
            state.tagsDataSource = JSON.parse(localStorage.getItem(state.tagsListName) || '[]');
        },
        tagsSetter: function (state:storeTags, value: string) {
            // @ts-ignore
            const list = state.tagsDataSource.filter(item => item.name === value);
            if (list.length !== 0) {
                // @ts-ignore
                alert('已有同名标签');
                return 'duplicated';
            } else if (value === '') {
                alert('标签不能为空');
                return 'duplicated';
            } else {
                let id = createId();
                // @ts-ignore
                state.tagsDataSource.push({id: id, name: value});
                localStorage.setItem('idMax', id.toString());
                localStorage.setItem(state.tagsListName, JSON.stringify(state.tagsDataSource));
                return 'success';
            }
        },
        tagsUpdate: function (state:storeTags, args: { index: number, tagName: string }) {
            const items = state.tagsDataSource!.filter((item: { name: string; }) => item.name === args.tagName);
            // @ts-ignore
            if (state.tagsDataSource[args.index].name === args.tagName) {

            } else if (items.length !== 0) {
                alert('已有同名标签');
                return 'fail';
            } else {
                // @ts-ignore
                state.tagsDataSource[args.index].name = args.tagName;
                localStorage.setItem(state.tagsListName, JSON.stringify(state.tagsDataSource));
                return 'success';
            }
        },
        tagsRemoved: function (state:storeTags,index:number){
            state.tagsDataSource!.splice(index,1)
            localStorage.setItem(state.tagsListName, JSON.stringify(state.tagsDataSource));
            return 'success'
        },
    },
    actions: {  },
    getters: {  }
}

export default tagsStore