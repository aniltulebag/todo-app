import React, { FC, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

import { ITextField } from './interfaces/ITextField';

const TaskTitleField: FC<ITextField> = (props): ReactElement => {
  const { disabled = false, onChange = (e) => console.log(e) } = props;

  return (
    <TextField
      id="title"
      name="title"
      label="Task Title"
      placeholder="Task Title"
      variant="outlined"
      size="small"
      fullWidth
      disabled={disabled}
      onChange={onChange}
    />
  );
};

TaskTitleField.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default TaskTitleField;
