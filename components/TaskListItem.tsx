import { Reference } from '@apollo/client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import {
  TaskStatus,
  useUpdateTaskMutation,
} from '../generated/graphql-frontend';
import {
  Task,
  useDeleteTaskMutation,
} from '../generated/graphql-frontend';

interface Props {
  task: Task;
}

const TaskListItem: React.FC<Props> = ({ task }) => {
  const [
    deleteTask,
    { loading, error },
  ] = useDeleteTaskMutation({
    variables: { id: task.id },
    errorPolicy: 'all',
    update: (cache, result) => {
      const deletedTask = result.data?.deleteTask;

      if (deletedTask) {
        cache.modify({
          fields: {
            tasks(taskRefs: Reference[], { readField }) {
              return taskRefs.filter((taskRef) => {
                return (
                  readField('id', taskRef) !==
                  deletedTask.id
                );
              });
            },
          },
        });
      }
    },
  });
  const handleDeleteClick = async () => {
    try {
      await deleteTask();
    } catch (e) {
      // Log the error
      console.log(e);
    }
  };

  useEffect(() => {
    if (error) {
      alert('An error occurred, please try again.');
    }
  }, [error]);

  const [
    updateTask,
    { loading: updateTaskLoading, error: updateTaskError },
  ] = useUpdateTaskMutation({ errorPolicy: 'all' });
  const handleStatusChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newStatus = e.target.checked
      ? TaskStatus.Completed
      : TaskStatus.Active;
    updateTask({
      variables: {
        input: { id: task.id, status: newStatus },
      },
    });
  };

  useEffect(() => {
    if (updateTaskError) {
      alert('An error occurred, please try again.');
    }
  }, [updateTaskError]);

  return (
    <div>
      <li className="task-list-item" key={task.id}>
        <label className="checkbox">
          <input
            type="checkbox"
            onChange={handleStatusChange}
            checked={task.status === TaskStatus.Completed}
            disabled={updateTaskLoading}
          />
          <span className="checkbox-mark">&#10003;</span>
        </label>
        <Link href="/update/[id]" as={`/update/${task.id}`}>
          <a className="task-list-item-title">
            {task.title}
          </a>
        </Link>
        <button
          className="task-list-item-delete"
          onClick={handleDeleteClick}
          disabled={loading}
        >
          &times;
        </button>
      </li>
    </div>
  );
};

export default TaskListItem;
