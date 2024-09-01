import React, { useContext } from 'react';
import FilterTodo from './elements/FilterTodo';
import TodoItem from "./elements/TodoItem";
import { TaskContext } from './context/TaskContext.jsx';

/**
 * TodoList view file
 */
function TodoList(props){

    const { todoListContext, filterInputContext, currentPageContext, taskCountContext, limitContext } = useContext(TaskContext)

    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                    <li className='page-item' style={{ float: 'left', width: '100%'}}>
                        <FilterTodo 
                            filterInput={filterInputContext}
                            handleFilter={props.handleFilter} 
                        />
                    </li>
                    {
                        taskCountContext > limitContext &&
                        <>
                            <li className={`page-item ${currentPageContext === 1 ? 'disabled' : ''}`}>
                                <button disabled={currentPageContext === 1 ? true : false} className="page-link" onClick={(e) => props.handlePagination('prev')}>Previous</button>
                            </li>
                            <li className="page-item">
                                <button className="page-link" onClick={(e) => props.handlePagination('next')}>Next</button>
                            </li>
                        </>
                    }
                </ul>
            </nav>
        
            {
                todoListContext && todoListContext.todos && todoListContext.todos.length > 0 &&
                <ul className="list-group">
                    {todoListContext.todos.map((data, index) => (
                        <React.Fragment key={index+1}>
                            <TodoItem 
                                data={data}
                                handleDeleteTask={props.handleDeleteTask}
                                handleUpdateTask={props.handleUpdateTask}
                            />
                        </React.Fragment>
                    ))}
                </ul>
            }
        </>
    )
}

export default TodoList;