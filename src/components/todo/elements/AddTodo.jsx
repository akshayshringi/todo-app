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
                placeholder="I'm going to..."
                value={props.newTaskInput} 
                onChange={props.handleAddTask}
                />
                <button className="btn btn-primary" onClick={(e) => props.addNewTask(e)}>Add</button>
            </form>
        </>
    )
}

export default AddTodo;