
const nameList = 'lists'

const configList = {
    getter(){
        return JSON.parse(localStorage.getItem(nameList) || '[]')

    },
    clone(data:TypeList){
        return data
    },
    setter(lists:TypeList[]){
        localStorage.setItem('lists',JSON.stringify(lists))
    }

}

export default configList