import React, {useState, useEffect} from "react";
import TaskList from "./Components/Tasks";


const HomePage = () => {
    const [loadedTasks, setLoadedTasks] = useState();
    useEffect(() => {
      const sendRequest = async () => {
        const response = await fetch('http://localhost:4001/api/tasks');
        const responseData  = await response.json();
        setLoadedTasks(responseData.tasks);
      }
      sendRequest();
    }, [])

    return (
      <>
          {loadedTasks && <TaskList items={loadedTasks} />}
          {!loadedTasks && <h1>No ongoing tasks</h1>}
      </>
    );
  }
export default HomePage;