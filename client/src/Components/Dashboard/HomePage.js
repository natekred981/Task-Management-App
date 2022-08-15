import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Card from "../../shared/components/UiElements/Card";
import ErrorModal from "../../shared/components/UiElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import TaskList from "./Components/Tasks";


const HomePage = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedTasks, setLoadedTasks] = useState();
    const  userId  = useParams().userId;
    useEffect(() => {
        const fetchUsers = async () => {
          try {
          const response = await sendRequest(`http://localhost:4001/api/tasks/${userId}`);
          setLoadedTasks(response.tasks);        
        } catch (err) {};
      };
        fetchUsers(); 
    }, [sendRequest, userId]);

    const placeDeleteHandler = (deletedTaskId) => {
      setLoadedTasks(prevTasks => 
          prevTasks.filter(task => task.id !== deletedTaskId));
    }
    if (!loadedTasks && isLoading) {
      return (
           <div className="center"><LoadingSpinner /></div> 
      );
    }
    
    return (
      <>
          <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
          {!isLoading && loadedTasks && <TaskList items={loadedTasks} onDeleteTask={placeDeleteHandler} />}
          </React.Fragment>

      </>
    );
  }
export default HomePage;