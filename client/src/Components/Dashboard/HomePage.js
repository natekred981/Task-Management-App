import React, {useState, useEffect} from "react";
import Card from "../../shared/components/UiElements/Card";
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
          {!loadedTasks && <Card>No ongoing tasks</Card>}
      </>
    );
  }
export default HomePage;