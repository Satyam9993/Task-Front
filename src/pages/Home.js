import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import TaskList from '../components/TaskList';
import { setTasks } from '../store/Tasks';
import CreateTask from '../components/CreateTask';
import { useNavigate } from 'react-router-dom';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);

  useEffect(() => {
    // eslint-disable-next-line
    if(!token){
      navigate("/login");
    }
  })

  // fetching all tasks
  const fetchTasks = async () => {
    const tasks = await fetch(`${BACKEND_URL}/task/`, 
    {
      method: 'GET',
      headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` },
    });
    const data = await tasks.json();
    dispatch(setTasks({
      tasks : data.tasks
    }));
  }

  useEffect(() => {
    // eslint-disable-next-line
    fetchTasks() 
  })

  return (
    <div>
      <Navbar />
      <div className='container m-auto p-5 flex justify-between'>
        <div className='text-3xl lg:text-4xl text-blue-700'>
          All Tasks
        </div>
        <div>
          <CreateTask />
        </div>
      </div>
      <TaskList />
    </div>
  )
}

export default Home
