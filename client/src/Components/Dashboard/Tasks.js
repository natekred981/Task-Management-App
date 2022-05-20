import Task from "./Components/Task";

import './Tasks.css'
const TaskList = props => {
    return (
      <>
      <ul className="tasks-list">
        {props.items.map((task,key) => (
          <Task
          key={key}
          id={task.id}
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