import React, { useEffect, useState } from 'react'
import Taskcard from './Taskcard';
import { useSelector } from 'react-redux';

const TaskList = () => {
    const tasks = useSelector(state => state.tasks.tasks)
    const [TaskList, setTaskList] = useState([]);

    useEffect(() => {
        setTaskList(tasks);
    }, [tasks])

    return (
        <div className='container m-auto p-5'>
            {TaskList.map(task => (
                <Taskcard task={task} key={task._id}/>
            ))}
        </div>
    )
}

export default TaskList
