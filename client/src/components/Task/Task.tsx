import React, { FC, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

import TaskHeader from './TaskHeader';
import TaskDescription from './TaskDescription';
import TaskFooter from './TaskFooter';

import { ITask } from './interfaces/ITask';

import { Status } from '../CreateTaskForm/enums/Status';
import { Priority } from '../CreateTaskForm/enums/Priority';

import { renderPriorityBorderColor } from './helpers/renderPriorityBorderColor';

const Task: FC<ITask> = (props): ReactElement => {
  const {
    id,
    title = 'Test Title',
    date = new Date(),
    description = 'Lorem ipsum dolor sit amet',
    priority = Priority.normal,
    status = Status.completed,
    onStatusChange = (e) => console.log(e),
    onClick = (e) => console.log(e),
  } = props;

  return (
    <Box
      display="flex"
      width="100%"
      justifyContent="flex-start"
      flexDirection="column"
      mb={4}
      p={2}
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: `${renderPriorityBorderColor(priority)}`,
      }}
    >
      <TaskHeader title={title} date={date} />
      <TaskDescription description={description} />
      <TaskFooter
        id={id}
        status={status}
        onStatusChange={onStatusChange}
        onClick={onClick}
      />
    </Box>
  );
};

Task.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  description: PropTypes.string,
  priority: PropTypes.oneOf([Priority.low, Priority.normal, Priority.high]),
  status: PropTypes.oneOf([Status.todo, Status.inProgress, Status.completed]),
  onStatusChange: PropTypes.func,
  onClick: PropTypes.func,
};

export default Task;
