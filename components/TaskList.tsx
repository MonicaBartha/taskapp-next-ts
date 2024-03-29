import React from 'react';
import { Task } from '../generated/graphql-frontend';
import TaskListItem from './TaskListItem';

interface Props {
  tasks: Task[];
}

const TaskList: React.FC<Props> = ({ tasks }) => {
  return (
    <ul className="task-list">
      {tasks &&
        tasks.length > 0 &&
        tasks.map((task) => {
          return <TaskListItem key={task.id} task={task} />;
        })}
    </ul>
  );
};

export default TaskList;
