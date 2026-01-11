export enum RESPONSE_MESSAGES {
  // Task Message
  TASK_CREATED = 'Task Created successfully.',
  TASKS_FETCHED = 'Tasks fetched successfully.',
  TASK_FETCHED = 'Task fetched successfully.',
  TASK_UPDATED = 'Task updated successfully.',
  TASK_DELETED = 'Task deleted successfully.',
  TASK_NOT_FOUND = 'Task not found.',
  NO_FIELDS_TO_UPDATE = 'No fields provided for update. Please provide at least one field (title, description, or status) to update.',

  // Generic Error Message
  SERVER_TEMPORY_DOWN = 'server is temporary down. please try again later',
}
