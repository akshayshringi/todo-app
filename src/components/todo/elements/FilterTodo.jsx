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
                    {
                        ['All','Completed','Pending'].map((option, index) =>
                            <option key={index} value={index}>{option}</option>            
                        )
                    }
            </select>
        </form>
    )
}

export default FilterTodo;