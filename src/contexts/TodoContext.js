import { createContext,useContext } from "react";


const TodoContext= createContext({
    todos:[  //todos property hai
        {    //ye sb values hai
            id:1,
            todoMsg:"Todo msg",
            completed:false,
        },
        {},{}
    ],  
    addTodo: (todoMsg) => {}, // functionality me defination nhi likte bs unke name likhte hai,ye sb methods hai
    updateTodo:(id,todoMsg)=>{},  // ye sb method  define hai,inki functionality khi or likhenge
    deleteTodo: (id)=>{},   //baki ye 4 methods hai
    toggleComplete: (id)=>{}

})


const useTodo=()=>{
    return useContext(TodoContext)
}

const TodoProvider = TodoContext.Provider

export {TodoContext,useTodo,TodoProvider}