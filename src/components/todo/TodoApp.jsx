import { useState, useEffect, useContext, lazy } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/brands.css';
import '@fortawesome/fontawesome-free/css/solid.css';
import axios from 'axios';
import TodoList from './TodoList';
import AddTodo from './elements/AddTodo';
import { AlertContext } from './../../context/AlertContext.jsx';
import { TaskContext } from './context/TaskContext.jsx';


/**
 * TodoApp Component
 */

function TodoApp(){

    // constants
    const USERID = 1;
    
    // states 
    const [newTaskInput, setNewTask] = useState('');

    const { handleAlert }  = useContext(AlertContext);
    const { todoListContext, taskCountContext, currentPageContext, filterInputContext, handleTaskList } = useContext(TaskContext);

    /**
     * useEffect to load data on page load
     * @method useEffect
     */
    useEffect(() => {
        handleTaskList(1);
    }, []);

    /**
     * 
     * @method handleAddTask
     * @param {*} e 
     */
    function handleAddTask(e){
        setNewTask(e.target.value);
    }

    /**
     * @method addNewTask
     */
    function addNewTask(e){
        e.preventDefault();
        if(newTaskInput == ''){
            handleAlert('danger','Enter task in text field.');
            return false;
        }
        let bodyPayload = JSON.stringify({
            todo: newTaskInput,
            completed: false,
            userId: USERID
        });
        axios.post('https://dummyjson.com/todos/add', bodyPayload,{
            headers: {
                'Content-Type': 'application/json'
              }
        }).then((result) => {
            if(result.status === 201 && result.data){
                // adding a auto incremented number in storage as well
                let autoIncrement = localStorage.getItem('auto_increment') ? parseInt(localStorage.getItem('auto_increment')) + 1 : 1; 
                let todoListLocal = JSON.parse(localStorage.getItem("todos"));
                result.data.id = autoIncrement;
                let cachedData = todoListLocal.length > 0 ? [result.data, ...todoListLocal] : [result.data];
                localStorage.setItem("todos", JSON.stringify(cachedData));
                localStorage.setItem("auto_increment", autoIncrement);
                handleTaskList(1, '');
                setNewTask('');
                handleAlert('success','Task created successfully');
                
            }            
        }).catch((err) => {
            handleAlert('danger',err.message);
        });
    }

    /**
     * @method handleFilter
     */
    function handleFilter(e){
        handleTaskList(1, parseInt(e.target.value));
    }

    /**
     * @method handlePagination
     * @param {*} action 
     */
    function handlePagination(action){
        let page = currentPageContext
        if(action === 'next'){
            page = page+1;
        }else{
            page = page-1;
        }
        handleTaskList(page, filterInputContext);
    }

    /**
     * @method handleUpdateTask
     * @param {*} e 
     * @param {*} data 
     */
    function handleUpdateTask(e, data){
        e.preventDefault();
        let todoListLocal = JSON.parse(localStorage.getItem("todos"));
        const findId = todoListLocal.findIndex((task) => task.id === data.id);
        todoListLocal[findId]['completed'] = !data.completed;
        localStorage.setItem('todos', JSON.stringify(todoListLocal));
        handleTaskList(currentPageContext, filterInputContext);
    }

    /**
     * 
     * @method handleDeleteTask
     * @param {*} e 
     * @param {*} data 
     */
    function handleDeleteTask(e, data){
        e.preventDefault();
        let todoListLocal = JSON.parse(localStorage.getItem("todos"));
        const findId = todoListLocal.findIndex((task) => task.id === data.id);
        todoListLocal.splice(findId, 1);
        localStorage.setItem('todos', JSON.stringify(todoListLocal));
        handleTaskList(currentPageContext, filterInputContext);
    }

    return (
        <div className="row flex-xl-nowrap">
            <div className='col-12 col-md-12 bd-content'>
                <h2><center>TODO APP ({taskCountContext})</center></h2>
                <AddTodo
                    handleAddTask={handleAddTask}
                    newTaskInput={newTaskInput}
                    addNewTask={addNewTask}
                />
                
                <div className="btn-group mb-3">
                </div>

                <TodoList  
                    handlePagination={handlePagination}
                    handleFilter={handleFilter}  
                    handleDeleteTask={handleDeleteTask}
                    handleUpdateTask={handleUpdateTask}
                />
            </div>

            
        </div>
    )

}

export default TodoApp;