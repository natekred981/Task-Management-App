import Task from "./Task.js";

import './Tasks.css'

const TaskList = props => {
    if (props.items.length === 0){
        return (
            <div className="center">
                <h2>No ongoing tasks</h2>
            </div>
        )
    }
    return (
      <>
      <ul className="tasks-list">
        {props.items.map((task,key) => (
          <Task
          key={key}
          title={task.title}
          option={task.option}
          description={task.description}
          completion={task.completion}
          />
        ))}
      </ul>
      </>
      
    );
}

export default TaskList;