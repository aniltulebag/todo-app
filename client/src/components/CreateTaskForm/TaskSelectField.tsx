import React, { FC, ReactElement } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import { ISelectField } from './interfaces/ISelectField';

const TaskSelectField: FC<ISelectField> = (props): ReactElement => {
  const {
    disabled = false,
    name = 'selectBox',
    label = 'Select Box',
    value = '',
    onChange = (e: SelectChangeEvent) => console.log(e),
    items = [{ value: '', label: 'Add Items' }],
  } = props;

  return (
    <FormControl fullWidth size="small">
      <InputLabel id={`${name}-id`}>{label}</InputLabel>
      <Select
        labelId={`${name}-id`}
        id={`${name}-select`}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {items.map((item, index) => (
          <MenuItem key={item.value + index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

TaskSelectField.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  ),
  onChange: PropTypes.func,
};

export default TaskSelectField;
