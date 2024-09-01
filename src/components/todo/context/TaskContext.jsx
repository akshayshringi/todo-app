import { createContext, useState } from 'react';
import axios from 'axios';

export const TaskContext = createContext();

/**
 * encapsulates all the child component so that list and pagination works can be triggered all over the todo 
 * 
 * @method TaskProvider
 * @param {*} param0 
 * @returns 
 */
export const TaskProvider = ({ children}) => {


    const [limitContext] = useState(5);
    const [todoListContext, setTodoList] = useState({
        todos: JSON.parse(localStorage.getItem("todos"))
    });
    const [filterInputContext, setFilterInput] = useState(0);
    const [currentPageContext, setCurrentPage] = useState(1);
    const [taskCountContext, setTaskCount] = useState(0);

    /**
     * @method handleTaskList
     * @param {*} type 
     * @param {*} message 
     */
    function handleTaskList(page, filter=''){
        setCurrentPage(page);
        setFilterInput(filter);
        let offset = page > 1 ? ( page-1 ) * limitContext : 0;
        let todoListLocal = JSON.parse(localStorage.getItem("todos"));
        if(todoListLocal){
            // check if filter is selected or not
            if(filter){
                let isCompleted = filter === 1 ? true : false;
                let taskFilter = todoListLocal.filter((data) => data.completed === isCompleted );
                setTaskCount(taskFilter.length);
                const filteredData = taskFilter.slice(offset, limitContext + offset);
                setTodoList((prevState) => {
                    return {
                        ...prevState,
                        todos: filteredData
                    }
                });
                
            }else{
                setTaskCount(todoListLocal.length);
                const filteredData = todoListLocal.slice(offset, limitContext + offset);
                setTodoList((prevState) => {
                    return {
                        ...prevState,
                        todos: filteredData
                    }
                });
            }
        }

        // if(!todoListLocal){
        //     axios.get(`https://dummyjson.com/todos/user/${USERID}?limit=${LIMIT}&skip=${offset}`)
        //     .then((result) => {
        //         if(result.status === 200 && result.data && result.data.todos){
        //             localStorage.setItem("todos", JSON.stringify(result.data.todos));
        //             setTodoList((prevState) => {
        //                 return {
        //                     ...prevState,
        //                     todos: result.data.todos
        //                 }
        //             });
        //             handleAlert('success','List loaded');
        //         }
        //     })
        //     .catch((err) => {
        //         handleAlert('danger',err.message);
        //     });
        // }else{
            
        // }
    }

    return (
       <TaskContext.Provider value={
        { 
            todoListContext, 
            filterInputContext, 
            currentPageContext, 
            taskCountContext, 
            limitContext,
            handleTaskList 
        }}>
            {children}
       </TaskContext.Provider>  
    )
}