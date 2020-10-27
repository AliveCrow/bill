import createId from '@/lib/createId'

const tagsName = 'tags';

type Tag = {
    id: number;
    name: string
}
type TagConfig = {
    data: Tag[];
    getter: () => Tag[];
    setter: (value: Tag) => 'success' | 'duplicated';
    update: (index: number, tagName: string) => 'success' | 'fail';
    remove:(index:number) =>  'success' | 'fail';
}


const tag = {
    data: [{id:1,name:''}],
    getter() {
        this.data = JSON.parse(localStorage.getItem(tagsName) || '[]');
        return this.data;
    },
    setter(value: string) {
        // @ts-ignore
        const list = this.data.filter(item => item.name === value);
        if (list.length !== 0) {
            // @ts-ignore
            alert('已有同名标签');
            return 'duplicated';
        }else if(value ===''){
            alert('标签不能为空');
            return 'duplicated';
        } else {
            let id = createId()
            // @ts-ignore
            this.data.push({id:id,name: value});
            localStorage.setItem('idMax',id.toString());
            localStorage.setItem(tagsName, JSON.stringify(this.data));
            return 'success';
        }
    },
    update(index: number, tagName: string) {
        const items = this.data.filter((item: { name: string; }) => item.name === tagName);
        if(this.data[index].name === tagName){

        }else{
            if (items.length !== 0) {
                alert('已有同名标签');
                return 'fail';
            } else {
                // @ts-ignore
                this.data[index].name = tagName;
                localStorage.setItem(tagsName, JSON.stringify(this.data));
                return 'success';
            }
        }

    },
    remove(index: number){
        this.data.splice(index,1)
        localStorage.setItem(tagsName, JSON.stringify(this.data));
        return 'success'
    }

};


export default tag;

