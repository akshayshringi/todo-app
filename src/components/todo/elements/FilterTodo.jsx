/**
 * FilterTodo elements
 */

function FilterTodo(props){

    return (
        <form className="form-row pb-4">
            <label htmlFor="task-action" style={{ paddingRight : '10px'}}>Filter By</label>
            <select 
                className="custom-select my-1 mr-sm-2" 
                id="task-action" 
                onChange={props.handleFilter}>
                <option value="">All</option>
                <option value="1">Completed</option>
                <option value="2">Uncompleted</option>
            </select>
        </form>
    )
}

export default FilterTodo;