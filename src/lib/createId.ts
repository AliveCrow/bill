

let id:number = parseInt(localStorage.getItem('idMax') || '7') || 7;

const createId = ()=>{
    id++

    return id
}

export  default createId



