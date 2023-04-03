import React, {
  FC,
  ReactElement,
  useState,
  useEffect,
  useContext,
} from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  Box,
  Typography,
  Stack,
  LinearProgress,
  Button,
  Alert,
  AlertTitle,
} from '@mui/material';

import TaskTitleField from './TaskTitleField';
import TaskDescriptionField from './TaskDescriptionField';
import DateField from './DateField';
import TaskSelectField from './TaskSelectField';

import { Status } from './enums/Status';
import { Priority } from './enums/Priority';

import { sendApiRequest } from '../../helpers/sendApiRequest';

import { ICreateTask } from '../TaskArea/interfaces/ICreateTask';

import { TaskStatusChangedContext } from '../../context';

const CreateTaskForm: FC = (): ReactElement => {
  // Declare component states
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<Date | null>(new Date());
  const [status, setStatus] = useState<string>(Status.todo);
  const [priority, setPriority] = useState<string>(Priority.normal);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const tasksUpdatedContext = useContext(TaskStatusChangedContext);

  // Create task mutation
  const createTaskMutation = useMutation((data: ICreateTask) => {
    return sendApiRequest('http://localhost:3100/tasks', 'POST', data);
  });

  const createTaskHandler = () => {
    if (!title || !date || !description) {
      return;
    }

    const task: ICreateTask = {
      title,
      description,
      date: date.toISOString(),
      status,
      priority,
    };

    createTaskMutation.mutate(task);
  };

  /**
   * Manage Side Effects inside the application
   */
  useEffect(() => {
    if (createTaskMutation.isSuccess) {
      setShowSuccess(true);
      tasksUpdatedContext.toggle();
    }

    const successTimeout = setTimeout(() => {
      setShowSuccess(false);
    }, 5000);

    return () => {
      clearTimeout(successTimeout);
    };
  }, [createTaskMutation.isSuccess]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
      px={4}
      my={6}
    >
      {showSuccess && (
        <Alert severity="success" sx={{ width: '100%', marginBottom: '16px' }}>
          <AlertTitle>Success</AlertTitle>
          The task has been created successfully
        </Alert>
      )}
      <Typography mb={2} component="h2" variant="h6">
        Create A Task
      </Typography>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <TaskTitleField
          disabled={createTaskMutation.isLoading}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TaskDescriptionField
          disabled={createTaskMutation.isLoading}
          onChange={(e) => setDescription(e.target.value)}
        />
        <DateField
          disabled={createTaskMutation.isLoading}
          value={date}
          onChange={(date) => setDate(date)}
        />
        <Stack spacing={2} direction="row" sx={{ width: '100%' }}>
          <TaskSelectField
            disabled={createTaskMutation.isLoading}
            label="Status"
            name="status"
            items={[
              { value: Status.todo, label: Status.todo.toUpperCase() },
              {
                value: Status.inProgress,
                label: Status.inProgress.toUpperCase(),
              },
            ]}
            value={status}
            onChange={(e) => setStatus(e.target.value as string)}
          />
          <TaskSelectField
            disabled={createTaskMutation.isLoading}
            label="Priority"
            name="priority"
            items={[
              {
                value: Priority.low,
                label:
                  Priority.low.charAt(0).toUpperCase() + Priority.low.slice(1),
              },
              {
                value: Priority.normal,
                label:
                  Priority.normal.charAt(0).toUpperCase() +
                  Priority.normal.slice(1),
              },
              {
                value: Priority.high,
                label:
                  Priority.high.charAt(0).toUpperCase() +
                  Priority.high.slice(1),
              },
            ]}
            value={priority}
            onChange={(e) => setPriority(e.target.value as string)}
          />
        </Stack>
        {createTaskMutation.isLoading && <LinearProgress />}
        <Button
          disabled={
            !title ||
            !description ||
            !date ||
            !status ||
            !priority ||
            createTaskMutation.isLoading
          }
          variant="contained"
          size="large"
          fullWidth
          onClick={createTaskHandler}
        >
          Create a Task
        </Button>
      </Stack>
    </Box>
  );
};

export default CreateTaskForm;
