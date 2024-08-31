import { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/brands.css';
import '@fortawesome/fontawesome-free/css/solid.css';
import axios from 'axios';
import TodoList from './TodoList';
import AddTodo from './elements/AddTodo';
import TodoItem from './elements/TodoItem';
import FilterTodo from './elements/FilterTodo';
import { AlertContext } from './../../context/AlertContext.jsx';


/**
 * TodoApp Component
 */

function TodoApp(){

    // constants
    const LIMIT = 20;
    const PAGE = 1;
    const USERID = 1;
    
    // state 
    const [todoList, setTodoList] = useState({
        todos: {}
    });
    const [totalList, setTotalList] = useState(0);
    const [newTaskInput, setNewTask] = useState('');

    const { handleAlert }  = useContext(AlertContext);

    /**
     * useEffect to load data on page load
     * @method useEffect
     */
    useEffect(() => {
        console.log('sdsd');
        getData();
    }, []);

    /**
     * @method getData
     */
    function getData(){
        let offset = PAGE > 1 ? PAGE * LIMIT : 0;
        var todoListLocal = JSON.parse(localStorage.getItem("todos"));
        if(!todoListLocal){
            axios.get(`https://dummyjson.com/todos/user/${USERID}?limit=${LIMIT}&skip=${offset}`)
            .then((result) => {
                if(result.status === 200 && result.data && result.data.todos){
                    localStorage.setItem("todos", JSON.stringify(result.data.todos));
                    setTodoList((prevState) => {
                        return {
                            ...prevState,
                            todos: result.data.todos
                        }
                    });
                    handleAlert('success','List loaded');
                }
            })
            .catch((err) => {
            console.log(err.message); 
            });
        }else{
            setTodoList((prevState) => {
                return {
                    ...prevState,
                    todos: todoListLocal
                }
            });
            handleAlert('success','List loaded');
        }
    }

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
        if(!newTaskInput){

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
                let cachedData = [result.data, ...todoList.todos];
                localStorage.setItem("todos", JSON.stringify(cachedData));
                setTodoList((prevState) => {
                    return {
                        ...prevState,
                        todos: cachedData
                    }
                });
                setNewTask('');
                handleAlert('success','Task created successfully');
            }            
        }).catch((err) => {

        });
    }

    return (
        <div className="p-4">

            <h2><center>TODO APP</center></h2>
            <FilterTodo />
            <AddTodo
                handleAddTask={handleAddTask}
                newTaskInput={newTaskInput}
                addNewTask={addNewTask}
            />
            
            <div className="btn-group mb-3">
            </div>

            <TodoList 
                todoList={todoList}                
            />
        </div>
    )

}

export default TodoApp;