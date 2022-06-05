import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useState, useEffect } from "react";
import React from "react";

// to run the mock json database: npm run server 
// to run the react dev server: npm start 

function App() {

  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([ ])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()

  }, [])

  //Fetching all tasks from json 
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  //Fetching one task data from json 
  const fetchTask = async(id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

//function to add tasks
//the following was used initially
  // const id = Math.floor(Math.random() * 10000) + 1
  // const newTask = {id, ...task}
  // setTasks ([...tasks, newTask])
//this function is also updated to add our new tasks to our db
const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks', {method: 'POST', 
  headers: {
    'Content-type': 'application/json'
  }, 
  body: JSON.stringify(task)
  })

  const data =  await  res.json()
  setTasks([...tasks, data])

}

//function to delete tasks by using their id to hide it from displaying
//we're setting the tasks to the filtered tasks
//and the filtered tasks are the ones that do not have the id of the task's whose trash button was clicked :)
//we changed this delete function to delete from the json db 
const deleteTask = async(id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})

  setTasks(tasks.filter((task) => task.id !== id ))
}

//function to toggle reminder
const toggleReminder = async (id) => {

  const taskToToggle = await fetchTask(id)
  const updatedTaks = { ...taskToToggle, reminder: !taskToToggle.reminder}
  const res = await fetch(`http://localhost:5000/tasks/${id}`, {method: 'PUT', 
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updatedTaks),
  })

  const data = await res.json() 

  setTasks(tasks.map ( (task) => 
  task.id === id ? { ...task, reminder: data.reminder } : task)
  )
}

  return (
    <div className="container">
      <Header onAdd={ () => setShowAddTask   (!showAddTask)} showAdd={showAddTask} /> 
      {showAddTask && <AddTask onAdd={addTask}/>}
      {
        tasks.length > 0 ? (
          <Tasks tasks = {tasks} onDelete = {deleteTask} onToggle = {toggleReminder}/>
        ) : (
          'No tasks left!'
        )
      }

    </div>
  );
}

export default App;
// JSX must have one parent element ie, we only have one div