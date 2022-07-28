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
    const [atLeastOneTask, setAtLeastOneTask] = useState(true);
    const  userId  = useParams().userId;
    console.log(userId);
    useEffect(() => {
            
        const fetchUsers = async () => {
          try {
          const response = await sendRequest(`http://localhost:4001/api/tasks/${userId}`);
          setLoadedTasks(response.tasks); 
          if (!loadedTasks) {
            setAtLeastOneTask(false);
          }       
        } catch (err) { };
      };
        fetchUsers(); 
    }, [sendRequest, userId]);
    
    return (
      <>
          <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
          {!isLoading && loadedTasks && <TaskList items={loadedTasks} />}
          {isLoading && atLeastOneTask && <div className="center"><LoadingSpinner /></div>}
          {isLoading && !loadedTasks && <Card>No ongoing tasks</Card>}
          </React.Fragment>

      </>
    );
  }
export default HomePage;