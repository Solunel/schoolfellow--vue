import {defineStore} from "pinia"

export const defineUser=defineStore(
    "loginUser",
    {
        state:()=>{
            return{
                jwt:''
            }
        },
        getters:{

        },
        actions:{

        }
    }
)