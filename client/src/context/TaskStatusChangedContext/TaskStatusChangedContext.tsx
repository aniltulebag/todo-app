import React, {
  createContext,
  FC,
  ReactElement,
  PropsWithChildren,
  useState,
} from 'react';

interface ITaskStatusChangedContext {
  updated: boolean;
  toggle: () => void;
}

export const TaskStatusChangedContext =
  createContext<ITaskStatusChangedContext>({
    updated: false,
    toggle: () => {},
  });

export const TaskStatusChangedContextProvider: FC<PropsWithChildren> = (
  props,
): ReactElement => {
  const [updated, setUpdated] = useState(false);

  const toggleHandler = () => setUpdated(!updated);

  return (
    <TaskStatusChangedContext.Provider
      value={{ updated, toggle: toggleHandler }}
    >
      {props.children}
    </TaskStatusChangedContext.Provider>
  );
};
