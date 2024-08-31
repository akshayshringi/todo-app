import React from 'react';
import TodoItem from "./elements/TodoItem";

/**
 * TodoList view file
 */
function TodoList(props){

    return (
        <ul className="list-group">
            {props.todoList && props.todoList.todos && props.todoList.todos.length && props.todoList.todos.map((data, index) => (
                <React.Fragment key={index+1}>
                    <TodoItem 
                        data={data}
                     />
                </React.Fragment>
            ))}
        </ul>
    )
}

export default TodoList;