import React, { FC, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

import { ITextField } from './interfaces/ITextField';

const TaskDescriptionField: FC<ITextField> = (props): ReactElement => {
  const { disabled = false, onChange = (e) => console.log(e) } = props;

  return (
    <TextField
      id="description"
      name="description"
      label="Description"
      placeholder="Description"
      variant="outlined"
      size="small"
      multiline
      rows={4}
      fullWidth
      disabled={disabled}
      onChange={onChange}
    />
  );
};

TaskDescriptionField.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default TaskDescriptionField;
