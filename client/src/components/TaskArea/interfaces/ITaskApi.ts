import { Priority } from '../../CreateTaskForm/enums/Priority';
import { Status } from '../../CreateTaskForm/enums/Status';

export interface ITaskApi {
  id: string;
  date: string;
  title: string;
  description: string;
  //! This is a literal syntax for Enums
  //* What it signifies is that the priority property is going to be a union of "high", "low" or "normal"
  //* We are saying, is that take all the values from the "Priority" enum and create a union of it using this syntax.
  priority: `${Priority}`;
  status: `${Status}`;
}
