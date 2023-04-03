import React from 'react';

export interface ITaskFooter {
  id: string;
  status?: string;
  onStatusChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => void;
  onClick?: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => void;
}
