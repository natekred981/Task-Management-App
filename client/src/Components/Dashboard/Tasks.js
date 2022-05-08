import Task from "./Task.js";

import Card from "../../shared/components/Card";
import './Tasks.css'

const TaskList = props => {
    // if (props.items.length === 0){
    //     return (
    //         <div className="center">
    //             <h2>No ongoing tasks</h2>
    //         </div>
    //     )
    // }
    return (
      <ul className="tasks-list">
        {props.items.map((task,key) => (
          <li className="task-item" id={key} key={task.id}>
            <Card>
              <div className="task-item_info">
                <h2>{task.title}</h2>
                <h3>{task.option}</h3>
              </div>
            </Card>
          </li>
        ))}
      </ul>
      //     <li className="task-item">
      //     <Card>
      //         <div className="user-item_info">
      //             <h2>{props.items.title}</h2>
      //             <h3>{props.items.option}</h3>
      //         </div>
      //     </Card>
      //   </li>
    );
}

export default TaskList;