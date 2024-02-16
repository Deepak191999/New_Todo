import { useEffect, useState } from "react";
import { TodoProvider } from "./contexts/TodoContext";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";


function App() {

  const [todos, setTodos] = useState([]);  // isme empty arr liye kyuki alg alg elememts ayenge phir loop nhi lganga pdega

  //jo name TodoContext file me rkha hai vhi name yha  rkhna hai
  const addTodo=(todoMsg)=>{
    // setTodos(todoMsg)   agr aise kta to purani sari values delete ho jaeynge arr me se
    
    setTodos((prevArr)=>[{id:Date.now(), ...todoMsg}, ...prevArr])    //isme humne purana arr new arr me dala + new todomsg or todoMsg ek obj hai to id leke baki ko ... kr dia
  }

  const updateTodo=(id,todoMsg)=>{
    setTodos((prevArr)=> prevArr.map((prevTodo)=>(prevTodo.id === id)?todoMsg : prevTodo))   //prev todo ki id jo todo update kra use se match kro agr shi hai to update krdo,vrna purani arr hi vapis krdo
  }

  const deleteTodo =(id)=>{
    setTodos((prevArr)=> prevArr.filter((prevTodo)=> prevTodo.id != id))   //new arr bna lenege jo id delete krni  hai bs vo nhi dalenge new arr me baki sb daal denge, jo id nhi match kregi vo newArr me jati rhengii,jiski id match hogi voo nhi jayega
  }

  const toggleComplete=(id)=>{
    setTodos((prevArr)=>prevArr.map((prevTodo)=> prevTodo.id=== id ? {...prevTodo,completed: !prevTodo.completed}  :prevTodo))
    //humne prevArr pe map kra check kra new id === prevtodo, age hai to use object to khola ... se phir agr complted true hai to false kra and vice versa,agr nhi hai to prevtodo de diya
  }


  //local storage in js (ye browser ki hi storage hoti h)
  // jb is app ko kholenge usme jo pivhli bar ke item hai vo bhi chaiye ,ye kam useEffect krega local storage me se purani item le ke ayega
  useEffect(() => {
    //jb tk react pe hai ,server side rendering nhi kr rh tb tk "localStorage" kam krega
  // localStorage.getItem("todos") ,  //ye dega string me hume json chaiye, check it on mdn "local storage js"

  const todosItem= JSON.parse(localStorage.getItem("todosItem"))
   if(todosItem && todosItem.length > 0){
    setTodos(todosItem)
   }
  }, []);


  useEffect(() => {
    localStorage.setItem("todosItem",JSON.stringify(todos))
  }, [todos]);





  return (
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo)=>(
              <div key={todo.id} className="w-full">
             <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
