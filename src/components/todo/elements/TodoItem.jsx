/**
 * TodoItem element
 */

function TodoItem(props){

    return  <li className="list-group-item" style={{ display: 'flex', alignItems: 'center' }}>
                <button
                    className={`fa fa-list`}
                    title={props.data.completed === true ? 'completed' : 'uncomplete'}
                    style={{ background: 'none', border: 'none' }}
                />
                <span style={{ flex: 1, textDecoration: props.data.completed ? 'line-through' : 'none' }}>{props.data.todo}</span>
                <button
                    className={`fa fa-${props.data.completed === true ? 'rotate-left' : 'check-double'}`}
                    title={props.data.completed === true ? 'completed' : 'uncomplete'}
                    style={{ background: 'none', border: 'none' }}
                />
                <button
                    className="fa fa-times"
                    title="delete"
                    style={{ background: 'none', border: 'none' }}
                />
            </li>
}

export default TodoItem;