/**
 * TodoItem element
 */

function TodoItem(props){

    return  <li className="list-group-item" style={{ display: 'flex', alignItems: 'center' }}>
                <button
                    className={`fa fa-list`}
                    title={props.data.completed === true ? 'completed' : 'pending'}
                    style={{ background: 'none', border: 'none' }}
                />
                <span style={{ flex: 1, textDecoration: props.data.completed ? 'line-through' : 'none' }}>{props.data.todo}</span>
                <button
                    className={`fa fa-${props.data.completed === true ? 'rotate-left' : 'check-double'}`}
                    title={props.data.completed === true ? 'completed' : 'pending'}
                    style={{ background: 'none', border: 'none' }}
                    onClick={(e) => props.handleUpdateTask(e, props.data)}
                />
                <button
                    className="fa fa-times"
                    title="delete"
                    style={{ background: 'none', border: 'none' }}
                    onClick={(e) => props.handleDeleteTask(e, props.data)}
                />
            </li>
}

export default TodoItem;