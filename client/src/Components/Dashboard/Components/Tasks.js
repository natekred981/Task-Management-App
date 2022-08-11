import Task from "./Task";

import './Tasks.css';

const TaskList = props => {
    return (
      <>
      <ul className="tasks-list">
        {props.items.map((task,key) => (
          <Task
          key={key}
          id={task.id}
          title={task.title}
          description={task.description}
          onDelete={props.onDeleteTask}
          />
        ))}
      </ul>
      </>
      
    );
}

export default TaskList;