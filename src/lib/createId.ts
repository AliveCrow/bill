

let id:number = parseInt(localStorage.getItem('idMax') || '0') || 0;

const createId = ()=>{
    id++

    return id
}

export  default createId



