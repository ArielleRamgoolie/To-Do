import { BsTrash } from 'react-icons/bs'
import React from 'react'

const Task = ( {task, onDelete, onToggle} ) => {
  return (
    <div className= {`task ${task.reminder ? 'reminder' : '' }`} 
    onDoubleClick={ () => onToggle(task.id) }>
        <h3>
            {task.text} 
            <BsTrash 
                style={{ color: 'darkred', cursor: 'pointer'}} 
                onClick={() => onDelete(task.id)}
            />
        </h3>
        <h6>{task.day}</h6>
    </div>
  )
}

export default Task