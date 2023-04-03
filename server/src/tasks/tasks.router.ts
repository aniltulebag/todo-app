import { Router } from 'express';

import { taskController } from './tasks.controller';
import { createValidator, updateValidator } from './tasks.validator';

export const tasksRouter: Router = Router();

// Create a default route.
tasksRouter
  .route('/tasks')
  .get(taskController.getAll)
  .post(createValidator, taskController.create)
  .put(updateValidator, taskController.update);
