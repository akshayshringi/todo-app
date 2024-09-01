/**
 * AddTodo component
 */

function AddTodo(props){

    
    return (
        <>
            <form className="mb-3 input-group">
                <input
                name="todo"
                className="form-control"
                placeholder="your task will be ..."
                value={props.newTaskInput} 
                onChange={(e) => props.handleAddTask(e)}
                />
                <button className="btn btn-primary" onClick={(e) => props.addNewTask(e)}>Add</button>
            </form>
        </>
    )
}

export default AddTodo;